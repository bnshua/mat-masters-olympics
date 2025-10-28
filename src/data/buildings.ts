import { Building } from "@/types/overworld";

export const BUILDINGS: Building[] = [
  {
    id: 'school',
    name: 'School',
    position: { x: 200, y: 150 },
    width: 120,
    height: 100,
    interactionDistance: 40,
    color: '#e74c3c' // red
  },
  {
    id: 'wrestling-room',
    name: 'Wrestling Room',
    position: { x: 450, y: 150 },
    width: 100,
    height: 90,
    interactionDistance: 40,
    color: '#3498db' // blue
  },
  {
    id: 'weight-room',
    name: 'Weight Room',
    position: { x: 200, y: 350 },
    width: 100,
    height: 90,
    interactionDistance: 40,
    color: '#2ecc71' // green
  },
  {
    id: 'dei-center',
    name: 'DEI Research Center',
    position: { x: 450, y: 350 },
    width: 110,
    height: 95,
    interactionDistance: 40,
    color: '#9b59b6' // purple
  }
];
