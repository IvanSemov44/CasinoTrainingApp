import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react-native';
import { render } from '@test-utils/render';
import { DropdownSelector } from './DropdownSelector';
import type { DropdownItem } from './DropdownSelector.types';

describe('DropdownSelector', () => {
  const mockOnSelect = jest.fn();
  const mockOnToggleDropdown = jest.fn();

  const mockItems: DropdownItem[] = [
    { key: 'easy', label: 'Easy', icon: '🟢', extraInfo: 'Max $50' },
    { key: 'medium', label: 'Medium', icon: '🟡', extraInfo: 'Max $100' },
    { key: 'hard', label: 'Hard', icon: '🔴', extraInfo: 'Max $200' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder when no item is selected', async () => {
    render(
      <DropdownSelector
        placeholder="Select difficulty..."
        items={mockItems}
        selectedKey={null}
        onSelect={mockOnSelect}
        showDropdown={false}
        onToggleDropdown={mockOnToggleDropdown}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Select difficulty...')).toBeTruthy();
    });
  });

  it('displays selected item when selectedKey is provided', async () => {
    render(
      <DropdownSelector
        placeholder="Select difficulty..."
        items={mockItems}
        selectedKey="easy"
        onSelect={mockOnSelect}
        showDropdown={false}
        onToggleDropdown={mockOnToggleDropdown}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Easy')).toBeTruthy();
      expect(screen.getByText('Max $50')).toBeTruthy();
    });
  });

  it('calls onToggleDropdown when trigger is pressed', async () => {
    render(
      <DropdownSelector
        placeholder="Select difficulty..."
        items={mockItems}
        selectedKey={null}
        onSelect={mockOnSelect}
        showDropdown={false}
        onToggleDropdown={mockOnToggleDropdown}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Select difficulty...')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Select difficulty...'));

    await waitFor(() => {
      expect(mockOnToggleDropdown).toHaveBeenCalled();
    });
  });

  it('displays dropdown list when showDropdown is true', async () => {
    render(
      <DropdownSelector
        placeholder="Select difficulty..."
        items={mockItems}
        selectedKey={null}
        onSelect={mockOnSelect}
        showDropdown={true}
        onToggleDropdown={mockOnToggleDropdown}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Easy')).toBeTruthy();
      expect(screen.getByText('Medium')).toBeTruthy();
      expect(screen.getByText('Hard')).toBeTruthy();
    });
  });

  it('calls onSelect with correct key when item is selected', async () => {
    render(
      <DropdownSelector
        placeholder="Select difficulty..."
        items={mockItems}
        selectedKey={null}
        onSelect={mockOnSelect}
        showDropdown={true}
        onToggleDropdown={mockOnToggleDropdown}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Hard')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Hard'));

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith('hard');
    });
  });

  it('hides dropdown list when showDropdown is false', async () => {
    const { queryByText } = render(
      <DropdownSelector
        placeholder="Select difficulty..."
        items={mockItems}
        selectedKey="easy"
        onSelect={mockOnSelect}
        showDropdown={false}
        onToggleDropdown={mockOnToggleDropdown}
      />
    );

    // Selected item should still show
    await waitFor(() => {
      expect(screen.getByText('Easy')).toBeTruthy();
    });
    // But other items should not be visible in dropdown
    expect(queryByText('Medium')).toBeFalsy();
  });

  it('displays all items in dropdown with extra info', async () => {
    render(
      <DropdownSelector
        placeholder="Select difficulty..."
        items={mockItems}
        selectedKey={null}
        onSelect={mockOnSelect}
        showDropdown={true}
        onToggleDropdown={mockOnToggleDropdown}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Max $50')).toBeTruthy();
      expect(screen.getByText('Max $100')).toBeTruthy();
      expect(screen.getByText('Max $200')).toBeTruthy();
    });
  });

  it('shows checkmark for selected item in dropdown', async () => {
    render(
      <DropdownSelector
        placeholder="Select difficulty..."
        items={mockItems}
        selectedKey="medium"
        onSelect={mockOnSelect}
        showDropdown={true}
        onToggleDropdown={mockOnToggleDropdown}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('✓')).toBeTruthy();
    });
  });

  it('handles items without icons', async () => {
    const itemsNoIcons = [
      { key: 'opt1', label: 'Option 1' },
      { key: 'opt2', label: 'Option 2' },
    ];

    render(
      <DropdownSelector
        placeholder="Select..."
        items={itemsNoIcons}
        selectedKey={null}
        onSelect={mockOnSelect}
        showDropdown={true}
        onToggleDropdown={mockOnToggleDropdown}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeTruthy();
      expect(screen.getByText('Option 2')).toBeTruthy();
    });
  });

  it('handles items without extraInfo', async () => {
    const itemsNoExtra = [
      { key: 'opt1', label: 'Option 1' },
      { key: 'opt2', label: 'Option 2' },
    ];

    render(
      <DropdownSelector
        placeholder="Select..."
        items={itemsNoExtra}
        selectedKey="opt1"
        onSelect={mockOnSelect}
        showDropdown={true}
        onToggleDropdown={mockOnToggleDropdown}
      />
    );

    await waitFor(() => {
      expect(screen.getAllByText('Option 1').length).toBeGreaterThan(0);
    });
  });
});
