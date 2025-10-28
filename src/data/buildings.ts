import { Building } from "@/types/overworld";

export const BUILDINGS: Building[] = [
  {
    id: 'school',
    name: 'School',
    position: { x: 200, y: 120 },
    width: 140,
    height: 120,
    interactionDistance: 50,
    color: '#dc2626' // red-600
  },
  {
    id: 'wrestling-room',
    name: 'Wrestling Room',
    position: { x: 460, y: 120 },
    width: 120,
    height: 100,
    interactionDistance: 50,
    color: '#2563eb' // blue-600
  },
  {
    id: 'weight-room',
    name: 'Weight Room',
    position: { x: 200, y: 340 },
    width: 120,
    height: 100,
    interactionDistance: 50,
    color: '#16a34a' // green-600
  },
  {
    id: 'dei-center',
    name: 'DEI Research Center',
    position: { x: 460, y: 340 },
    width: 120,
    height: 100,
    interactionDistance: 50,
    color: '#9333ea' // purple-600
  }
];
