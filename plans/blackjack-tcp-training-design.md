# Blackjack & Three Card Poker — Dealer Training Design

> This document captures the full rules for both games as played at this casino,
> the training objectives, drill types, and difficulty progression before implementation begins.

---

## Game 1: Blackjack

### 1.1 Dealing Procedure

Cards are dealt in this exact order:
1. One card face up to each active box (left to right)
2. One card face up to the dealer
3. Second card face up to each active box (left to right)
4. Dealer stops — **no second card to dealer at this point**

> This casino does NOT use a hole card. Dealer draws their remaining cards
> after all players have finished acting.

**After step 4, before any player acts:**
- If dealer's card is **Ace** → dealer actively offers insurance to all players
- If dealer's card is **10/J/Q/K** → dealer does not offer anything; player may request the Ace bet

Insurance and the Ace bet must both be placed at this moment — once players start acting on their hands, neither bet is accepted.

---

### 1.2 Card Values

| Cards | Value |
|---|---|
| 2 – 10 | Face value |
| J, Q, K | 10 |
| Ace | 1 or 11 |

**Soft hand:** Ace counted as 11. Always announced with both values.
- A + 5 = "6 or 16"
- A + 6 = "7 or 17" → dealer stands
- A + 7 = "8 or 18" → dealer stands
- A + A = "2 or 12"

**Hard hand:** No Ace, or Ace forced to count as 1.

**Natural Blackjack:** First two cards = Ace + any 10-value card. Pays 3:2.

---

### 1.3 Dealer Rules

- Dealer **stands on all 17s** — including soft 17 (A + 6)
- Dealer **hits on 16 and below**
- Dealer acts **last**, after all players have finished

---

### 1.4 Player Options

| Option | Rule |
|---|---|
| Hit | Take another card |
| Stand | Keep current hand |
| Double Down | Double the bet, receive exactly one more card |
| Split | Same-rank cards only (10+10 ✓, J+Q ✗). Equal second bet required |
| Surrender | Return half the bet — only valid before player draws any additional card |
| Insurance | See section 1.5 |

**Split rules in detail:**
- Maximum 3 splits = 4 boxes total
- Can double down after a non-Ace split
- **Split Aces:** one card each, no re-split, no double, no Blackjack
  - If player receives Ace + 10 after splitting Aces → counts as 21, pays 1:1 (not 3:2)

---

### 1.5 Insurance & Ace Bet

**Insurance (dealer-initiated):**
- Triggered when dealer's first card is **Ace**
- Dealer actively offers to all players immediately after dealing is complete
- Pays **2:1**
- Min: €1 — Max: half of the player's main bet
- Once players begin acting on their hands, insurance is no longer accepted

**Ace Bet (player-initiated):**
- Triggered when dealer's first card is **10, J, Q, or K**
- Player *requests* this bet — dealer does not offer it
- Bet is that dealer's next card will be an Ace (i.e., dealer would have Blackjack)
- Pays **11:1**
- Min: €1 — Max: half of the player's main bet (same limit as insurance)
- Accepted at the same moment as insurance — before any player acts
- Dealer must know what it is, when it is valid, and how to pay it

---

### 1.6 Payouts

| Result | Pays |
|---|---|
| Player wins | 1:1 |
| Natural Blackjack | 3:2 |
| Insurance | 2:1 |
| Ace Bet (10-card) | 11:1 |
| Push | Return bet |
| Surrender | Return half the bet |
| Dealer busts | All remaining players win 1:1 |
| Player vs dealer BJ | Push |

**3:2 payout reference (common bet amounts):**
| Bet | BJ Pays |
|---|---|
| €15 | €22.50 |
| €20 | €30 |
| €25 | €37.50 |
| €30 | €45 |
| €35 | €52.50 |
| €50 | €75 |
| €75 | €112.50 |
| €100 | €150 |

> Fractional payouts (odd bet amounts) are the most common payout error for new dealers.

---

### 1.7 Side Bets

#### BJ Side Bet
- Player's first two cards form a Natural Blackjack
- Pays **15:1**
- Independent of the main hand result

#### Pair Side Bet
- Player's first two cards are any pair (2+2, J+J, A+A, etc.)
- Pays **11:1**
- Independent of the main hand result

#### Super Seven
Tracked across the player's first 1, 2, or 3 cards. Only 7s count.

| Condition | Pays |
|---|---|
| First card = any 7 | 3:1 |
| First 2 cards = 7, different suits | 30:1 |
| First 2 cards = 7, same suit | 100:1 |
| All 3 cards = 7, mixed suits | 500:1 |
| All 3 cards = 7, same suit | 5000:1 |

> "Same suit" = all cards are the same symbol (all ♦, all ♥, all ♣, or all ♠).
> "Different suits" = any mix of suits.
> This casino uses **6 decks** — the 5000:1 payout is possible (e.g., 7♦ + 7♦ + 7♦ from different decks).

---

### 1.8 Bet Limits

| Bet Type | Min | Max |
|---|---|---|
| Main bet (standard table) | €15 | €1,000 |
| Main bet (high table) | €25 | €1,000 |
| Insurance | €1 | Half of main bet |
| Ace Bet (10-card) | €1 | Half of main bet |
| BJ Side Bet | €1 | €100 |
| Pair Side Bet | €1 | €100 |
| Super Seven | €1 | €100 |

---

## Game 2: Three Card Poker

### 2.1 Game Overview

Two completely independent bets:
- **Ante / Play** — player competes against the dealer
- **Pair Plus** — player competes against a fixed pay table, independent of dealer hand

---

### 2.2 Hand Rankings

> Note: ranking differs from standard poker. Three of a Kind beats a Straight.

| Rank | Hand |
|---|---|
| 1 (best) | Straight Flush |
| 2 | **Three of a Kind** |
| 3 | Straight |
| 4 | Flush |
| 5 | Pair |
| 6 | High Card |

---

### 2.3 Game Flow

1. Player places **Ante** bet (and optional **Pair Plus** bet)
2. Deal 3 cards face up to player, 3 cards face down to dealer
3. Player looks at their cards and decides:
   - **Fold** → lose Ante, Pair Plus is still resolved
   - **Play** → place a Play bet equal to the Ante
4. Dealer reveals their 3 cards
5. Dealer must **qualify** with Queen-high or better:
   - **No qualify:** Ante pays 1:1, Play bet pushes (returned)
   - **Qualifies, dealer wins:** Ante and Play both lose
   - **Qualifies, player wins:** Ante and Play both pay 1:1
   - **Tie:** Push (both Ante and Play returned)
6. Resolve **Ante Bonus** (if applicable) — see section 2.4
7. Resolve **Pair Plus** (if applicable) — see section 2.5

---

### 2.4 Ante Bonus

Pays based on the **player's hand** only. Pays regardless of whether the player wins or loses against the dealer.

| Hand | Pays |
|---|---|
| Straight Flush | 4:1 |
| Three of a Kind | 3:1 |
| Straight | 1:1 |

> Key scenario: Player has a Straight, dealer has a better Straight.
> Ante loses. Play loses. **Ante Bonus still pays 1:1** on the Ante amount.
> This is the most important rule new dealers forget.

---

### 2.5 Pair Plus Pay Table

Fully independent — pays based only on the player's hand, regardless of dealer hand, dealer qualification, or whether the player folded their Ante.

| Hand | Pays |
|---|---|
| Straight Flush | 40:1 |
| Three of a Kind | 30:1 |
| Straight | 6:1 |
| Flush | 3:1 |
| Pair | 1:1 |

> In practice, a player with a qualifying Pair Plus hand will not fold their Ante.
> Pair Plus paying on a folded Ante is theoretically possible but extremely rare.

---

### 2.6 Bet Limits

| Table | Min per bet | Max per bet |
|---|---|---|
| Standard table | €10 | €100 |
| High table | €25 | €300 |

> Limits apply to each bet independently — Ante, Play, and Pair Plus each have their own min/max.

---

## Game 3: Caribbean Poker

### 3.1 Game Overview

5-card stud poker, player vs dealer only. No competition between players.
Standard poker hand rankings (5 cards).

Two bets:
- **Ante / Call** — player competes against the dealer
- **Bonus** — fixed €1 side bet, independent of all other outcomes

---

### 3.2 Dealing Procedure

1. Player places Ante bet (+ optional €1 Bonus bet)
2. Deal 5 cards face up to each player (left to right)
3. Deal 5 cards to the dealer — **4 face down, 1 face up**
4. Players look at their cards and the dealer's visible card, then each independently decide

---

### 3.3 Player Decisions (two-phase)

**Phase 1 — each player independently chooses:**

| Decision | Action |
|---|---|
| **Fold** | Player puts cards face down. Dealer collects cards and Ante immediately |
| **Play (Call)** | Player places cards face down on play position, places Call bet (2× Ante) on top |
| **Swap** | Player gives 1 card face down to dealer + pays 1 Ante as swap fee. Waits |

**Phase 2 — dealer processes all decisions in order:**
1. Collects folded players' cards and money
2. Verifies all Play bets are correctly placed (exactly 2× Ante)
3. Processes each swap: collects the card + swap fee, gives a new card
4. Swap players then make their final decision: Fold or Play (same rules as Phase 1)

> The swap must be fully processed for all players before dealer reveals their hand.
> Dealer must remember which players swapped — it affects the Bonus payout.

---

### 3.4 Dealer Qualification & Outcomes

Dealer must qualify with **Ace-King or better** (A-K-x-x-x minimum).

| Outcome | Ante | Call |
|---|---|---|
| Dealer does not qualify | 1:1 | Push (returned) |
| Dealer qualifies, dealer wins | Lose | Lose |
| Dealer qualifies, player wins | 1:1 | Pay by Call table below |
| Tie | Push | Push |

---

### 3.5 Call Bet Pay Table

Applies when dealer qualifies **and** player wins.

| Hand | Pays |
|---|---|
| Royal Flush | 100:1 |
| Straight Flush | 50:1 |
| Four of a Kind | 20:1 |
| Full House | 7:1 |
| Flush | 5:1 |
| Straight | 4:1 |
| Three of a Kind | 3:1 |
| Two Pair | 2:1 |
| One Pair or less | 1:1 |

---

### 3.6 Bonus Bet

Fixed €1 side bet. Pays based on player's hand only.

**Pays regardless of:** dealer qualification, dealer's hand, or whether player folded their Ante.

| Hand | Standard | After Card Swap |
|---|---|---|
| Royal Flush | €5,000 | €2,500 |
| Straight Flush | €1,000 | €500 |
| Four of a Kind | €300 | €150 |
| Full House | €150 | €75 |
| Flush | €100 | €50 |

> If the player used the card swap, **all Bonus payouts are halved**.
> Bonus pays even if the player folded their Ante — extremely rare in practice but valid.

---

### 3.7 Bet Limits

| Table | Ante Min | Ante Max |
|---|---|---|
| Standard | €15 | €100 |
| High | €25 | €300 |

> Bonus bet: fixed €1 per hand, always.
> Call bet is always exactly 2× Ante — no separate limit.
> Swap fee is always exactly 1× Ante.

---

## Game 4: Texas Hold'em Ultimate

### 4.1 Game Overview

Community card poker, player vs dealer only. Best 5-card hand from 2 hole cards + 5 community cards.

Three bets:
- **Ante** and **Blind** — placed before any cards are dealt, must be equal amounts
- **Play** — placed during the hand at one of three decision points
- **Trips Plus** — optional side bet, independent of all other outcomes

---

### 4.2 Dealing Procedure

1. Player places equal Ante and Blind bets (+ optional Trips Plus)
2. Deal 2 hole cards face down to each player, 2 face down to dealer
3. Players look at their own hole cards only
4. Community cards dealt in stages: Flop (3 cards), then Turn + River (1+1)

---

### 4.3 Betting Rounds — Three Decision Points

Player gets exactly one chance to place their Play bet, at one of three moments:

| When | Options |
|---|---|
| **Pre-flop** — after seeing hole cards | Raise **3× or 4× Ante** as Play bet — or Check |
| **Flop** — after seeing 3 community cards (only if checked pre-flop) | Raise **2× Ante** as Play bet — or Check |
| **Turn + River** — after seeing all 5 community cards (only if checked twice) | Raise **1× Ante** as Play bet — or **Fold** |

> If player raises at any point, they skip all later decision points.
> At the last step (Turn + River), player **cannot check** — must raise 1× or fold.
> Folding loses both Ante and Blind.

---

### 4.4 Dealer Qualification & Outcomes

Dealer must qualify with **a Pair or better**.

**Key rule:** If dealer does not qualify, the **Ante is always returned** to the player — regardless of who wins the hand comparison. All other bets are still resolved by comparing hands normally.

| Outcome | Ante | Blind | Play |
|---|---|---|---|
| Dealer doesn't qualify, player wins | Push (returned) | Pays by table | 1:1 |
| Dealer doesn't qualify, dealer wins | Push (returned) | Lose | Lose |
| Dealer qualifies, player wins | 1:1 | Pays by table | 1:1 |
| Dealer qualifies, dealer wins | Lose | Lose | Lose |
| Tie | Push | Push | Push |

> Example: Player has Q-high, dealer has K-high (doesn't qualify). Dealer wins comparison.
> → Ante returned to player, Play bet lost to dealer.

---

### 4.5 Blind Pay Table

Pays when player wins (hand comparison, regardless of dealer qualification).

| Hand | Pays |
|---|---|
| Royal Flush | 500:1 |
| Straight Flush | 50:1 |
| Four of a Kind | 10:1 |
| Full House | 3:1 |
| Flush | 3:2 |
| Straight | 1:1 |
| Less than Straight (but player wins) | Push |

> The Blind never loses when dealer doesn't qualify — it either pays or pushes.

---

### 4.6 Trips Plus

Optional side bet. Pays based on the player's final best 5-card hand. **Fully independent** — pays regardless of dealer qualification or whether the player wins.

| Hand | Pays |
|---|---|
| Royal Flush | 50:1 |
| Straight Flush | 40:1 |
| Four of a Kind | 30:1 |
| Full House | 8:1 |
| Flush | 7:1 |
| Straight | 4:1 |
| Three of a Kind | 3:1 |

---

### 4.7 Bet Limits

| Table | Ante/Blind Min | Ante/Blind Max |
|---|---|---|
| Standard | €10 each | €100 each |
| High | €25 each | €300 each |

> Ante and Blind are always equal.
> Play bet is a multiple of the Ante (3×, 4×, 2×, or 1×) — no separate limit.
> Trips Plus: min €1 (to confirm exact max).

---

## Game 5: Roulette

> Note: The app already has a skills training module covering inside bet payout calculation,
> mixed bet calculation, cash handling, and the racetrack/announced bet layout.
> This section documents the **rules knowledge** not yet covered by that training.

### 5.1 Game Overview

European roulette — single zero (0–36, 37 numbers total).

- If **0** is the result: all even-money outside bets **lose** — no La Partage, no En Prison.
- Players bet before the spin. Dealer announces "no more bets" before result.
- Inside and outside bets can be combined freely.

---

### 5.2 Inside Bets (already drilled in skills training — for reference)

| Bet | Numbers Covered | Pays |
|---|---|---|
| Straight Up | 1 | 35:1 |
| Split | 2 adjacent | 17:1 |
| Street | 3 (one row) | 11:1 |
| Corner / Square | 4 | 8:1 |
| Six Line | 6 (two rows) | 5:1 |

---

### 5.3 Outside Bets (NOT yet drilled — knowledge gap)

| Bet | Numbers Covered | Pays |
|---|---|---|
| Dozen 1 (1–12) | 12 | 2:1 |
| Dozen 2 (13–24) | 12 | 2:1 |
| Dozen 3 (25–36) | 12 | 2:1 |
| Column 1 / 2 / 3 | 12 | 2:1 |
| Red / Black | 18 | 1:1 |
| Even / Odd | 18 | 1:1 |
| Low (1–18) | 18 | 1:1 |
| High (19–36) | 18 | 1:1 |

> Zero (0) is neither red/black, even/odd, low/high, nor in any dozen or column.
> When 0 hits, **all outside bets lose**.

---

### 5.4 Announced / Called Bets (layout in app, chip counts not yet drilled)

| Bet | Numbers Covered | Total Chips | Composition |
|---|---|---|---|
| Voisins du Zéro | 17 numbers around 0 | 9 chips | Street [0,2,3]×2 + 4 splits + Corner [25,26,28,29]×2 |
| Tiers du Cylindre | 12 numbers opposite 0 | 6 chips | 6 splits: [5,8][10,11][13,16][23,24][27,30][33,36] |
| Orphelins | 8 remaining numbers | 5 chips | Straight [1] + 4 splits: [6,9][14,17][17,20][31,34] |
| Jeu Zéro | 7 numbers near 0 | 4 chips | Straight [26] + 3 splits: [0,3][12,15][32,35] |
| Neighbors (x) | 5 numbers (x ± 2 on wheel) | 5 chips | 5 straight-ups |

---

### 5.5 Bet Limits

**Standard table:**
| Bet Type | Min | Max |
|---|---|---|
| Inside bets (all positions) | €2 | €200 |
| Dozen / Column | €10 | €500 |
| Red/Black, Even/Odd, Low/High | €10 | €1,000 |

**High table:**
| Bet Type | Min | Max |
|---|---|---|
| Inside bets (all positions) | €5 | €200 |
| Dozen / Column | €25 | €500 |
| Red/Black, Even/Odd, Low/High | €25 | €1,000 |

> Inside bet maximum (€200) is the same regardless of table type.

---

## Training Design

### 3.1 Blackjack — Drill Types

| Drill | What It Tests | Difficulty |
|---|---|---|
| Soft hand recognition | Identify hand value and announce correctly ("6 or 16") | Easy |
| Dealer action | Show dealer hand — hit or stand? | Easy |
| Hand comparison | Dealer vs player — who wins? | Easy |
| BJ payout | Calculate 3:2 payout for given bet amount | Medium |
| Side bet payout | BJ bet / Pair bet — is it a winner? Pay how much? | Medium |
| Insurance timing | When to offer insurance, when to accept Ace bet | Medium |
| Surrender | Player requests — return how much? Is it still allowed? | Medium |
| Split scenario | Can these cards split? What are the rules after? | Medium |
| Super Seven | Cards dealt one by one — track and pay correctly | Advanced |
| Full hand simulation | Multi-step: deal → insurance → player options → dealer acts → pay all bets | Advanced |
| Odd-amount BJ payout | Fractional 3:2 payouts ($15, $35, $75 bets) | Advanced |

---

### 3.2 Blackjack — Difficulty Progression

**Easy**
- Soft vs hard hand identification
- Dealer must-hit / must-stand decisions
- Basic win/lose/push outcomes

**Medium**
- BJ payout calculation (round amounts)
- Insurance offer timing and payout
- Split eligibility rules
- Surrender eligibility and return amount
- BJ and Pair side bet recognition and payout

**Advanced**
- Odd-amount BJ payout (fractions)
- Super Seven tracking across 1–3 cards
- Full hand: multiple boxes + multiple side bets + BJ payout + insurance all at once
- Edge cases: split Aces getting 10 (not BJ), player BJ vs dealer BJ (push), Ace bet on 10-card

---

### 3.3 Three Card Poker — Drill Types

| Drill | What It Tests | Difficulty |
|---|---|---|
| Hand recognition | Name the hand from 3 cards | Easy |
| Ranking quiz | Which hand ranks higher? (Three of a Kind vs Straight) | Easy |
| Dealer qualification | Does this hand qualify? | Easy |
| Pair Plus payout | Player hand + bet amount → pay how much? | Medium |
| Ante Bonus | Does this hand earn Ante Bonus? Pay how much? | Medium |
| Full outcome | Player vs dealer, all bets → resolve everything | Advanced |
| Ante Bonus on loss | Player has Straight, dealer wins — what gets paid? | Advanced |
| Multi-bet resolution | Ante + Play + Pair Plus + Ante Bonus all at once | Advanced |

---

### 3.4 Three Card Poker — Difficulty Progression

**Easy**
- Hand name recognition from 3 cards
- Three of a Kind vs Straight ranking (counter-intuitive — drilling essential)
- Dealer qualification: qualify or not?

**Medium**
- Pair Plus payouts (hand + bet amount)
- Ante Bonus recognition (which hands trigger it?)
- Simple Ante/Play outcomes (no edge cases)

**Advanced**
- Full resolution: player hand vs dealer hand + all bets including Ante Bonus
- Ante Bonus paying when player loses the hand
- Pair Plus paying when player lost on Ante/Play

---

### 4.1 Caribbean Poker — Drill Types

| Drill | What It Tests | Difficulty |
|---|---|---|
| Hand recognition | Name the 5-card poker hand | Easy |
| Dealer qualification | A-K or better — qualify or not? | Easy |
| Basic outcome | Qualify + compare hands — who wins? | Easy |
| Call bet payout | Player wins with Full House, Ante €20 — pay how much? | Medium |
| Bonus recognition | Does this hand trigger the Bonus? How much? | Medium |
| Bonus after swap | Same hand but player swapped — how much now? | Medium |
| Swap procedure | Player wants to swap — what does dealer do and in what order? | Medium |
| Full hand resolution | Multiple players, some folded/played/swapped — resolve all bets | Advanced |
| Bonus on a folded hand | Player folded but had a Flush — does Bonus pay? | Advanced |
| No-qualify scenario | Dealer has J-high, player has One Pair — resolve Ante, Call, Bonus | Advanced |

---

### 4.2 Caribbean Poker — Difficulty Progression

**Easy**
- 5-card hand recognition (all rankings, Royal Flush through High Card)
- Dealer qualification: Ace-King or better?
- Basic outcomes: qualify/no qualify, win/lose/push

**Medium**
- Call bet payout by hand rank (multiplier × Ante)
- Bonus bet recognition and fixed payout
- Bonus payout halved after swap
- Swap procedure and sequence (Phase 1 → Phase 2)

**Advanced**
- Full hand: multiple players with different decisions (fold / play / swap)
- No-qualify scenario: Call pushes even though player has strong hand
- Bonus paying on a folded Ante
- Dealer correctly tracking which players swapped before paying Bonus

---

### 5.1 Texas Hold'em Ultimate — Drill Types

| Drill | What It Tests | Difficulty |
|---|---|---|
| Hand recognition | Name the best 5-card hand from 7 cards | Easy |
| Dealer qualification | Does this hand qualify (pair or better)? | Easy |
| Raise decision | Pre-flop: raise 3×, 4×, or check? | Medium |
| Blind payout | Player wins with Flush, Blind €20 — pay how much? | Medium |
| Trips Plus payout | Player's final hand + Trips bet → pay how much? | Medium |
| No-qualify scenario | Dealer doesn't qualify, dealer wins comparison — resolve all bets | Medium |
| Blind push | Player wins with Two Pair — what does Blind pay? | Medium |
| Full hand resolution | All decision points + all bets → resolve everything | Advanced |
| Blind on dealer loss (no qualify) | Dealer doesn't qualify, player wins with Straight — Blind pays how much? | Advanced |
| Multi-bet advanced | Ante + Blind + Play + Trips Plus, dealer qualifies, player wins with Flush | Advanced |

---

### 5.2 Texas Hold'em Ultimate — Difficulty Progression

**Easy**
- 5-card hand recognition from 7 available cards (best hand)
- Dealer qualification: pair or better?
- Basic outcomes: who wins?

**Medium**
- Blind pay table (which hands pay above 1:1, which push)
- No-qualify rule: Ante always returned, other bets still resolved
- Trips Plus payouts (independent of everything)
- Pre-flop raise sizing (3× vs 4×)

**Advanced**
- Full hand: raise decision → flop → turn+river → dealer reveals → resolve all 3 bets
- No-qualify + dealer wins scenario: Ante returned but Play and Blind lost
- Blind push on sub-Straight winning hands
- All 3 bets simultaneously: Ante, Blind by table, Play, Trips Plus

---

### 6.1 Roulette — Knowledge Drill Types (new — skills training already exists)

| Drill | What It Tests | Difficulty |
|---|---|---|
| Outside bet payout | Player has €50 on Red — wins, pays how much? | Easy |
| Dozen vs Column | "What bets cover numbers 1–12?" | Easy |
| Zero rule | 0 hits, player has €30 on Even — what happens? | Easy |
| Outside bet recognition | Show a position on the layout — what bet type is it? | Easy |
| Announced bet chip count | "How many chips for Voisins?" | Medium |
| Announced bet numbers | "Which numbers does Tiers du Cylindre cover?" | Medium |
| Announced bet composition | "What individual bets make up Orphelins?" | Medium |
| Mixed outside payout | Player has €20 on Column 2 + €50 on Red — number wins both — pay how much? | Medium |
| Announced + inside mixed | Player has Voisins (9 chips, €1 each) + €10 Straight on 26 — 26 wins — pay? | Advanced |
| Bet limits quiz | "What is the max inside bet on the standard table?" | Easy |

---

### 6.2 Roulette — Knowledge Difficulty Progression

**Easy**
- Outside bet payouts (even money 1:1, dozens/columns 2:1)
- Zero rule (all outside bets lose, including even money)
- Which bets are inside vs outside
- Bet limits

**Medium**
- Announced bet chip counts (Voisins=9, Tiers=6, Orphelins=5, Jeu Zéro=4, Neighbors=5)
- Announced bet number coverage (which numbers each sector covers)
- Announced bet composition (what individual bets they consist of)

**Advanced**
- Full payout when winning number hits multiple announced + inside bets simultaneously
- Edge case: number is in two different announced bets (e.g., 17 is in Orphelins via split 17/20)

> The existing skills training (payout calculation, cash handling) remains separate
> and covers inside bet arithmetic drills at increasing speed and complexity.

---

### 3.5 Scenario Data Model (shared with PLO pattern)

Each drill will follow the same structure already used in PLO training:

```typescript
interface TrainingScenario {
  question: string;          // what the dealer must determine
  correctAnswer: number | string;
  explanation: string;       // step-by-step breakdown shown after
  difficulty: 'easy' | 'medium' | 'advanced';
}
```

For Blackjack payout drills, `correctAnswer` is the dollar amount.
For action drills, `correctAnswer` is the action string ('hit' | 'stand' | 'offer_insurance' | etc.).
For Three Card Poker, `correctAnswer` is the payout amount or hand name.

---

## Open Questions Before Implementation

- [x] What are the other two games to be added? → Caribbean Poker, Texas Hold'em Ultimate, Roulette (discuss separately; Roulette training partially exists already)
- [x] Should the app track which dealer is training? → No login/profiles for now; tracking added later when game logic is complete
- [x] Bet limits? → Documented in sections 1.8 and 2.6
- [x] How many decks? → 6 decks
- [x] Max on 10-card Ace bet? → Half of main bet (same as insurance) — to confirm exactly later
