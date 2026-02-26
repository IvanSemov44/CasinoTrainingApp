/**
 * Tests for DropdownSelector component
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DropdownSelector, DropdownItem } from '../DropdownSelector';

describe('DropdownSelector', () => {
  const mockItems: DropdownItem[] = [
    { key: 'easy', label: 'Easy', icon: '🟢', extraInfo: 'Max $50' },
    { key: 'medium', label: 'Medium', icon: '🟡', extraInfo: 'Max $100' },
    { key: 'hard', label: 'Hard', icon: '🔴', extraInfo: 'Max $200' },
  ];

  const defaultProps = {
    placeholder: 'Select difficulty...',
    items: mockItems,
    selectedKey: null,
    onSelect: jest.fn(),
    showDropdown: false,
    onToggleDropdown: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render placeholder when no item is selected', () => {
      const { getByText } = render(<DropdownSelector {...defaultProps} />);
      expect(getByText('Select difficulty...')).toBeTruthy();
    });

    it('should render selected item label when selected', () => {
      const { getByText } = render(
        <DropdownSelector {...defaultProps} selectedKey="easy" />
      );
      expect(getByText('Easy')).toBeTruthy();
    });

    it('should render selected item icon when selected', () => {
      const { getByText } = render(
        <DropdownSelector {...defaultProps} selectedKey="easy" />
      );
      expect(getByText('🟢')).toBeTruthy();
    });

    it('should render selected item extra info when selected', () => {
      const { getByText } = render(
        <DropdownSelector {...defaultProps} selectedKey="easy" />
      );
      expect(getByText('Max $50')).toBeTruthy();
    });

    it('should render dropdown arrow down when closed', () => {
      const { getByText } = render(<DropdownSelector {...defaultProps} />);
      expect(getByText('▼')).toBeTruthy();
    });

    it('should render dropdown arrow up when open', () => {
      const { getByText } = render(
        <DropdownSelector {...defaultProps} showDropdown={true} />
      );
      expect(getByText('▲')).toBeTruthy();
    });
  });

  describe('dropdown list', () => {
    it('should not show dropdown list when showDropdown is false', () => {
      const { queryByText } = render(<DropdownSelector {...defaultProps} />);
      expect(queryByText('Medium')).toBeNull();
    });

    it('should show dropdown list when showDropdown is true', () => {
      const { getByText } = render(
        <DropdownSelector {...defaultProps} showDropdown={true} />
      );
      expect(getByText('Easy')).toBeTruthy();
      expect(getByText('Medium')).toBeTruthy();
      expect(getByText('Hard')).toBeTruthy();
    });

    it('should show all item icons in dropdown', () => {
      const { getByText } = render(
        <DropdownSelector {...defaultProps} showDropdown={true} />
      );
      expect(getByText('🟢')).toBeTruthy();
      expect(getByText('🟡')).toBeTruthy();
      expect(getByText('🔴')).toBeTruthy();
    });

    it('should show all item extra info in dropdown', () => {
      const { getByText } = render(
        <DropdownSelector {...defaultProps} showDropdown={true} />
      );
      expect(getByText('Max $50')).toBeTruthy();
      expect(getByText('Max $100')).toBeTruthy();
      expect(getByText('Max $200')).toBeTruthy();
    });

    it('should show checkmark for selected item in dropdown', () => {
      const { getAllByText } = render(
        <DropdownSelector {...defaultProps} showDropdown={true} selectedKey="medium" />
      );
      // Checkmark is ✓
      const checkmarks = getAllByText('✓');
      expect(checkmarks.length).toBe(1);
    });
  });

  describe('interactions', () => {
    it('should call onToggleDropdown when trigger is pressed', () => {
      const onToggleDropdown = jest.fn();
      const { getByText } = render(
        <DropdownSelector {...defaultProps} onToggleDropdown={onToggleDropdown} />
      );

      fireEvent.press(getByText('Select difficulty...'));
      expect(onToggleDropdown).toHaveBeenCalledTimes(1);
    });

    it('should call onSelect when dropdown item is pressed', () => {
      const onSelect = jest.fn();
      const { getByText } = render(
        <DropdownSelector
          {...defaultProps}
          showDropdown={true}
          onSelect={onSelect}
        />
      );

      fireEvent.press(getByText('Medium'));
      expect(onSelect).toHaveBeenCalledWith('medium');
    });

    it('should call onSelect with correct key for each item', () => {
      const onSelect = jest.fn();
      const { getByText } = render(
        <DropdownSelector
          {...defaultProps}
          showDropdown={true}
          onSelect={onSelect}
        />
      );

      fireEvent.press(getByText('Easy'));
      expect(onSelect).toHaveBeenCalledWith('easy');

      fireEvent.press(getByText('Hard'));
      expect(onSelect).toHaveBeenCalledWith('hard');
    });
  });

  describe('accessibility', () => {
    it('should have accessibility label on trigger', () => {
      const { getByLabelText } = render(<DropdownSelector {...defaultProps} />);
      expect(getByLabelText('Select difficulty...')).toBeTruthy();
    });

    it('should have combobox accessibility role on trigger', () => {
      const { getByLabelText } = render(<DropdownSelector {...defaultProps} />);
      const trigger = getByLabelText('Select difficulty...');
      expect(trigger.props.accessibilityRole).toBe('combobox');
    });

    it('should indicate expanded state when dropdown is open', () => {
      const { getByLabelText } = render(
        <DropdownSelector {...defaultProps} showDropdown={true} />
      );
      const trigger = getByLabelText('Select difficulty...');
      expect(trigger.props.accessibilityState).toEqual({ expanded: true });
    });

    it('should indicate collapsed state when dropdown is closed', () => {
      const { getByLabelText } = render(<DropdownSelector {...defaultProps} />);
      const trigger = getByLabelText('Select difficulty...');
      expect(trigger.props.accessibilityState).toEqual({ expanded: false });
    });

    it('should have accessibility labels on dropdown items', () => {
      const { getByLabelText } = render(
        <DropdownSelector {...defaultProps} showDropdown={true} />
      );
      expect(getByLabelText('Easy')).toBeTruthy();
      expect(getByLabelText('Medium')).toBeTruthy();
      expect(getByLabelText('Hard')).toBeTruthy();
    });

    it('should indicate selected state on dropdown items', () => {
      const { getByLabelText } = render(
        <DropdownSelector
          {...defaultProps}
          showDropdown={true}
          selectedKey="easy"
        />
      );
      const easyButton = getByLabelText('Easy');
      expect(easyButton.props.accessibilityState).toEqual({ selected: true });
    });
  });

  describe('items without icon or extraInfo', () => {
    const simpleItems: DropdownItem[] = [
      { key: 'option1', label: 'Option 1' },
      { key: 'option2', label: 'Option 2' },
    ];

    it('should render items without icons', () => {
      const { getByText, queryByText } = render(
        <DropdownSelector
          {...defaultProps}
          items={simpleItems}
          showDropdown={true}
        />
      );
      expect(getByText('Option 1')).toBeTruthy();
      expect(getByText('Option 2')).toBeTruthy();
      // No icons should be present
      expect(queryByText('🟢')).toBeNull();
    });

    it('should render selected item without extraInfo', () => {
      const { getByText, queryByText } = render(
        <DropdownSelector
          {...defaultProps}
          items={simpleItems}
          selectedKey="option1"
        />
      );
      expect(getByText('Option 1')).toBeTruthy();
      // No extra info should be present
      expect(queryByText('Max $')).toBeNull();
    });
  });

  describe('error handling', () => {
    it('should handle empty items array gracefully', () => {
      const { getByText } = render(
        <DropdownSelector {...defaultProps} items={[]} />
      );
      // Should still render placeholder
      expect(getByText('Select difficulty...')).toBeTruthy();
    });

    it('should not crash when onSelect is undefined', () => {
      const { getByText } = render(
        <DropdownSelector
          {...defaultProps}
          showDropdown={true}
          onSelect={undefined as any}
        />
      );

      // Should not throw when pressing an item
      expect(() => fireEvent.press(getByText('Easy'))).not.toThrow();
    });

    it('should not crash when onToggleDropdown is undefined', () => {
      const { getByText } = render(
        <DropdownSelector
          {...defaultProps}
          onToggleDropdown={undefined as any}
        />
      );

      // Should not throw when pressing trigger
      expect(() => fireEvent.press(getByText('Select difficulty...'))).not.toThrow();
    });

    it('should handle selectedKey that does not exist in items', () => {
      const { getByText } = render(
        <DropdownSelector {...defaultProps} selectedKey="nonexistent" />
      );
      // Should render placeholder when key not found
      expect(getByText('Select difficulty...')).toBeTruthy();
    });

    it('should handle items with duplicate keys', () => {
      const duplicateItems: DropdownItem[] = [
        { key: 'duplicate', label: 'First' },
        { key: 'duplicate', label: 'Second' },
      ];

      const { getByText } = render(
        <DropdownSelector
          {...defaultProps}
          items={duplicateItems}
          showDropdown={true}
        />
      );

      // Should render both items (component doesn't prevent duplicates)
      expect(getByText('First')).toBeTruthy();
      expect(getByText('Second')).toBeTruthy();
    });
  });
});
