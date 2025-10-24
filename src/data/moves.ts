import { Move } from '@/types/game';

export const moves: Move[] = [
  {
    id: 'double-leg',
    name: 'Double Leg Takedown',
    category: 'takedown',
    power: 8,
    staminaCost: 15,
    description: 'Drive through opponent\'s legs for a powerful takedown',
    educationalTip: 'The double leg teaches explosive power and proper level change technique.'
  },
  {
    id: 'arm-drag',
    name: 'Arm Drag',
    category: 'grapple',
    power: 6,
    staminaCost: 10,
    description: 'Control opponent\'s arm to gain positional advantage',
    educationalTip: 'The arm drag emphasizes leverage and timing over raw strength.'
  },
  {
    id: 'half-nelson',
    name: 'Half Nelson',
    category: 'hold',
    power: 7,
    staminaCost: 12,
    description: 'Control opponent from behind for potential pin',
    educationalTip: 'This move teaches upper body control and patience.'
  },
  {
    id: 'sprawl',
    name: 'Sprawl Defense',
    category: 'counter',
    power: 5,
    staminaCost: 8,
    description: 'Counter a takedown attempt with defensive positioning',
    educationalTip: 'Sprawling demonstrates the importance of defensive awareness.'
  },
  {
    id: 'switch',
    name: 'Switch Escape',
    category: 'escape',
    power: 6,
    staminaCost: 10,
    description: 'Reverse position from bottom to gain control',
    educationalTip: 'The switch teaches hip movement and escape mechanics.'
  },
  {
    id: 'single-leg',
    name: 'Single Leg Takedown',
    category: 'takedown',
    power: 7,
    staminaCost: 12,
    description: 'Attack one leg for a controlled takedown',
    educationalTip: 'Single leg takedowns focus on balance and persistence.'
  },
  {
    id: 'cradle',
    name: 'Cradle Hold',
    category: 'pin',
    power: 9,
    staminaCost: 18,
    description: 'Lock opponent in position for potential pin',
    educationalTip: 'The cradle combines strength with technical precision for maximum effect.'
  },
  {
    id: 'stand-up',
    name: 'Stand-Up Escape',
    category: 'escape',
    power: 5,
    staminaCost: 8,
    description: 'Return to feet from bottom position',
    educationalTip: 'Standing up requires core strength and proper hand positioning.'
  }
];
