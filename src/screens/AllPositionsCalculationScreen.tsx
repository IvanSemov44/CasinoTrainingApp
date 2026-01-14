import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import RouletteLayout from '../components/roulette/RouletteLayout';
import NumberPad from '../components/exercises/NumberPad';
import ExerciseStats from '../components/exercises/ExerciseStats';
import HintSection from '../components/exercises/HintSection';
import FeedbackCard from '../components/exercises/FeedbackCard';
import type { RouletteNumber } from '../types/roulette.types';

type BetType = 'STRAIGHT' | 'SPLIT' | 'CORNER' | 'STREET' | 'SIX_LINE';

interface Bet {
    type: BetType;
    numbers: RouletteNumber[];
    chips: number;
    payout: number;
}

export default function AllPositionsCalculationScreen() {
    const [winningNumber, setWinningNumber] = useState<RouletteNumber>(5);
    const [bets, setBets] = useState<Bet[]>([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showHint, setShowHint] = useState(false);

    // Get all valid splits for a number
    const getSplitsForNumber = (num: RouletteNumber): [RouletteNumber, RouletteNumber][] => {
        const splits: [RouletteNumber, RouletteNumber][] = [];

        if (num === 0) {
            return [[0, 1], [0, 2], [0, 3]];
        }

        // Vertical splits (consecutive numbers in same column)
        if (num > 0 && num < 12) {
            if (num % 3 !== 0) splits.push([num, (num + 1) as RouletteNumber]);
            if (num % 3 !== 1) splits.push([(num - 1) as RouletteNumber, num]);
        }

        // Horizontal splits (same row, different columns)
        if (num >= 4) splits.push([(num - 3) as RouletteNumber, num]);
        if (num <= 9) splits.push([num, (num + 3) as RouletteNumber]);

        return splits;
    };

    // Get all valid corners for a number
    const getCornersForNumber = (num: RouletteNumber): RouletteNumber[][] => {
        const allCorners: RouletteNumber[][] = [
            [0, 1, 2, 3],
            [1, 2, 4, 5],
            [2, 3, 5, 6],
            [4, 5, 7, 8],
            [5, 6, 8, 9],
            [7, 8, 10, 11],
            [8, 9, 11, 12],
        ];

        return allCorners.filter(corner => corner.includes(num));
    };

    // Get all valid streets for a number
    const getStreetsForNumber = (num: RouletteNumber): RouletteNumber[][] => {
        const allStreets: RouletteNumber[][] = [
            [0, 1, 2],
            [0, 2, 3],
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10, 11, 12],
        ];

        return allStreets.filter(street => street.includes(num));
    };

    // Get all valid six lines for a number
    const getSixLinesForNumber = (num: RouletteNumber): RouletteNumber[][] => {
        const allSixLines: RouletteNumber[][] = [
            [1, 2, 3, 4, 5, 6],
            [4, 5, 6, 7, 8, 9],
            [7, 8, 9, 10, 11, 12],
        ];

        return allSixLines.filter(sixLine => sixLine.includes(num));
    };

    const generateNewQuestion = () => {
        // Pick a random winning number from 0-12
        const number = Math.floor(Math.random() * 13) as RouletteNumber;
        setWinningNumber(number);

        const newBets: Bet[] = [];

        // Always add straight up bet on winning number
        const straightChips = Math.floor(Math.random() * 3) + 1;
        newBets.push({
            type: 'STRAIGHT',
            numbers: [number],
            chips: straightChips,
            payout: 35,
        });

        // Add 1-2 splits that include the winning number
        const possibleSplits = getSplitsForNumber(number);
        if (possibleSplits.length > 0) {
            const numSplits = Math.min(
                Math.floor(Math.random() * 2) + 1,
                possibleSplits.length
            );

            const shuffledSplits = [...possibleSplits].sort(() => Math.random() - 0.5);
            for (let i = 0; i < numSplits; i++) {
                const splitChips = Math.floor(Math.random() * 3) + 1;
                newBets.push({
                    type: 'SPLIT',
                    numbers: shuffledSplits[i],
                    chips: splitChips,
                    payout: 17,
                });
            }
        }

        // Add 0-1 corners that include the winning number
        const possibleCorners = getCornersForNumber(number);
        if (possibleCorners.length > 0 && Math.random() > 0.3) {
            const numCorners = Math.min(
                Math.floor(Math.random() * 2) + 1,
                possibleCorners.length
            );

            const shuffledCorners = [...possibleCorners].sort(() => Math.random() - 0.5);
            for (let i = 0; i < numCorners; i++) {
                const cornerChips = Math.floor(Math.random() * 3) + 1;
                newBets.push({
                    type: 'CORNER',
                    numbers: shuffledCorners[i],
                    chips: cornerChips,
                    payout: 8,
                });
            }
        }

        // Add 0-1 streets that include the winning number
        const possibleStreets = getStreetsForNumber(number);
        if (possibleStreets.length > 0 && Math.random() > 0.4) {
            const streetIdx = Math.floor(Math.random() * possibleStreets.length);
            const streetChips = Math.floor(Math.random() * 3) + 1;
            newBets.push({
                type: 'STREET',
                numbers: possibleStreets[streetIdx],
                chips: streetChips,
                payout: 11,
            });
        }

        // Add 0-1 six lines that include the winning number
        const possibleSixLines = getSixLinesForNumber(number);
        if (possibleSixLines.length > 0 && Math.random() > 0.5) {
            const sixLineIdx = Math.floor(Math.random() * possibleSixLines.length);
            const sixLineChips = Math.floor(Math.random() * 3) + 1;
            newBets.push({
                type: 'SIX_LINE',
                numbers: possibleSixLines[sixLineIdx],
                chips: sixLineChips,
                payout: 5,
            });
        }

        setBets(newBets);
        setUserAnswer('');
        setShowFeedback(false);
        setShowHint(false);
    };

    useEffect(() => {
        generateNewQuestion();
    }, []);

    const calculateCorrectAnswer = (): number => {
        return bets.reduce((total, bet) => total + (bet.chips * bet.payout), 0);
    };

    const handleCheckAnswer = () => {
        const correctAnswer = calculateCorrectAnswer();
        const userNum = parseInt(userAnswer);
        const correct = userNum === correctAnswer;

        setIsCorrect(correct);
        setShowFeedback(true);
        setAttempts(attempts + 1);
        if (correct) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        generateNewQuestion();
    };

    const handleNumberPress = (num: string) => {
        if (userAnswer.length < 4) {
            setUserAnswer(userAnswer + num);
        }
    };

    const handleClear = () => {
        setUserAnswer('');
    };

    const handleBackspace = () => {
        setUserAnswer(userAnswer.slice(0, -1));
    };

    const getBetTypeName = (type: BetType): string => {
        switch (type) {
            case 'STRAIGHT': return 'Straight';
            case 'SPLIT': return 'Split';
            case 'CORNER': return 'Corner';
            case 'STREET': return 'Street';
            case 'SIX_LINE': return 'Six Line';
        }
    };

    const getExplanation = (): string => {
        const parts = bets.map(bet => {
            const numbersStr = bet.type === 'STRAIGHT'
                ? `${bet.numbers[0]}`
                : bet.numbers.join('-');
            return `${numbersStr} (${bet.chips} × ${bet.payout} = ${bet.chips * bet.payout})`;
        });

        const total = calculateCorrectAnswer();
        return parts.join(' + ') + ` = ${total}`;
    };

    // Mock placed bets for visual reference
    const mockPlacedBets = bets.map((bet, index) => ({
        id: `bet-${index}`,
        type: bet.type as any,
        numbers: bet.numbers,
        amount: bet.chips,
        payout: bet.payout,
        timestamp: Date.now(),
    }));

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <ExerciseStats score={score} attempts={attempts} />

                <HintSection isOpen={showHint} onToggle={() => setShowHint(!showHint)}>
                    • Winning number: <Text style={styles.highlightNumber}>{winningNumber}</Text>{'\n'}
                    • Calculate total payout for all winning bets{'\n'}
                    • Straight up: chips × 35{'\n'}
                    • Split: chips × 17{'\n'}
                    • Corner: chips × 8{'\n'}
                    • Street: chips × 11{'\n'}
                    • Six Line: chips × 5{'\n'}
                    • Add all payouts together{'\n'}
                    {'\n'}
                    <Text style={styles.hintTitle}>Bets on winning number:{'\n'}</Text>
                    {bets.map((bet, index) => (
                        <Text key={index} style={styles.hintBet}>
                            {index + 1}. {getBetTypeName(bet.type)}{' '}
                            <Text style={styles.highlightNumber}>
                                {bet.type === 'STRAIGHT' ? bet.numbers[0] : bet.numbers.join('-')}
                            </Text>
                            {' with '}
                            <Text style={styles.highlightChips}>{bet.chips}</Text>
                            {' '}{bet.chips === 1 ? 'chip' : 'chips'}{'\n'}
                        </Text>
                    ))}
                </HintSection>

                <View style={styles.visualReference}>
                    <Text style={styles.sectionTitle}>Visual Reference</Text>
                    <ScrollView
                        horizontal
                        style={styles.layoutScroll}
                        showsHorizontalScrollIndicator={false}
                    >
                        <RouletteLayout
                            cellSize={55}
                            maxColumns={4}
                            showOutsideBets={false}
                            showColumnBets={false}
                            placedBets={mockPlacedBets}
                            onNumberPress={() => {}}
                        />
                    </ScrollView>
                </View>

                <View style={styles.questionSection}>
                    <Text style={styles.questionText}>
                        Enter total payout:
                    </Text>
                    <View style={styles.answerContainer}>
                        <Text style={styles.answerText}>{userAnswer || '0'}</Text>
                    </View>
                </View>

                <NumberPad
                    onNumberPress={handleNumberPress}
                    onClear={handleClear}
                    onBackspace={handleBackspace}
                    disabled={showFeedback}
                />

                <TouchableOpacity
                    style={[styles.checkButton, showFeedback && styles.checkButtonDisabled]}
                    onPress={handleCheckAnswer}
                    disabled={showFeedback || userAnswer === ''}
                >
                    <Text style={styles.checkButtonText}>Check Answer</Text>
                </TouchableOpacity>

                {showFeedback && (
                    <FeedbackCard
                        isCorrect={isCorrect}
                        correctAnswer={calculateCorrectAnswer()}
                        explanation={getExplanation()}
                        onNextQuestion={handleNextQuestion}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    visualReference: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    layoutScroll: {
        maxHeight: 400,
    },
    questionSection: {
        marginBottom: 20,
    },
    questionText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    answerContainer: {
        backgroundColor: '#2a2a2a',
        borderRadius: 8,
        padding: 20,
        borderWidth: 2,
        borderColor: '#FFD700',
        alignItems: 'center',
    },
    answerText: {
        color: '#FFD700',
        fontSize: 32,
        fontWeight: 'bold',
    },
    checkButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    checkButtonDisabled: {
        backgroundColor: '#555',
    },
    checkButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    highlightNumber: {
        color: '#FFD700',
        fontWeight: 'bold',
    },
    highlightChips: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    hintTitle: {
        color: '#FFD700',
        fontWeight: 'bold',
        marginTop: 5,
    },
    hintBet: {
        color: '#ccc',
        lineHeight: 22,
    },
});
