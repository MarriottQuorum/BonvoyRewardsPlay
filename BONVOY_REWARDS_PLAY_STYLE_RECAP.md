# Bonvoy Rewards Play — Premium Handoff Recap

## Overall app name
Bonvoy Rewards Play

## Core product vision
A premium portrait-first Marriott Bonvoy front-desk game suite. It should feel like a luxury digital kiosk, not a generic web app.

## Real-world screen context
- Tall portrait TV / kiosk orientation
- Viewed from roughly 5–15 feet away
- Reflections and overhead lighting are real factors
- The whole screen needs to feel used
- Contrast must be stronger than a typical laptop web page

## Shared prize source
All games should read from the same PRIZES_MASTER CSV:
https://docs.google.com/spreadsheets/d/e/2PACX-1vSghLINBiTIV-kBxQ1W5tHwMFTdJg_8SS5ut_EcagFvcszr0FLLUmV8k5gQUR7YKA/pub?gid=966349411&single=true&output=csv

## Shared settings model
Settings live on the menu page only.
No settings should live on game screens.

Shared settings:
- sound on/off
- popup / banner duration (global across all games)
- after-win action:
  - return to main menu
  - return back to the game
- Lucky Loop random path toggle

Winner / congrats popups across all games should close after the same configured popup duration.
After that, behavior should follow the separate after-win action toggle.

## Design language
- black / charcoal premium base
- gold trim and warm gold glow
- jewel-tone accent categories
- layered gradients, not flat color blocks
- subtle depth and inner glow
- large premium typography
- strong top / middle / bottom structure
- minimal copy
- premium, app-designed feel

## Approved icon system
Use the premium gold icons on dark background:
- points
- star
- gift
- surprise
- dining
- drink
- coffee
- breakfast
- parking
- mclub
- upgrade
- bonus

Upgrade can remain the arrow-based icon for now.

## Menu page direction
- polished and finished
- no placeholder / live labels
- elegant, short copy
- premium large game cards
- unobtrusive settings menu
- include full screen button
- use Bonvoy branding appropriately, but do not overuse multiple logos on the same screen

## Lucky Loop direction
- premium hollow-square board
- 5x5 outer ring with 3x3 center stage
- icons on tiles
- active highlight must be obvious from a distance
- center should stay cleaner: big spin / stop button + result moment
- winner overlay should feel large and celebratory
- confetti on winner

## Spin & Win direction
- premium wheel, not generic web spinner
- center spin button only
- pointer points down at the winning segment
- label alignment must stay correct while spinning and after landing
- segment divider lines are needed
- wheel labels can be shortened on the wheel, but winner popup shows the full prize
- confetti on winner
- upscale lighting and depth should stay intact

## Plinko direction
- single ball
- equal bucket widths
- center bucket should hit much less often than the others
- use as much of the portrait screen as possible
- premium black-and-gold board with glowing pegs and a metallic gold ball
- buckets use icons + short labels
- confetti on winner
