# Drake Equation Galaxy Simulation

An interactive 3D visualization of the Drake equation, simulating the potential for detectable civilizations in our galaxy and their expansion over time.

## Features

- **Interactive 3D Galaxy**: Explore a realistic 3D model of a spiral galaxy with thousands of stars
- **Drake Equation Calculator**: Adjust parameters to estimate the number of detectable civilizations
- **Civilization Generation**: Visualize potential civilizations based on Drake equation results
- **Expansion Simulation**: Watch civilizations expand their spheres of influence over time
- **Dynamic Interactions**: Civilizations can conquer, be conquered, or merge based on their relative strengths

## Civilization Mechanics

Each civilization is characterized by:
- **Tech Advancement Rate**: (0-1) Represents technological sophistication
- **Aggressiveness Factor**: (0-1) Represents military/expansionist tendency
- **Expansion Rate**: Determines how quickly their sphere of influence grows
- **Sphere of Influence**: Visualized as a transparent sphere around their core world

### Expansion and Technology
Civilizations have three possible expansion/tech categories:
- Slow (30% chance): 0.5-2.5 units/time (tech rate: 0.02-0.1)
- Medium (42% chance): 3-10 units/time (tech rate: 0.12-0.4)
- Fast (28% chance): 10-25 units/time (tech rate: 0.4-1.0)

This linking of expansion and technology represents how a civilization's ability to expand is directly related to their technological advancement.

### Civilization touchpoints
Civilization touchpoints are checked continuously during expansion:

## Metrics Tracked
- **Earth Encounters**: Number of civilizations that have reached Earth
- **Dominant Civilization**: Shows which civilization has conquered the most unique other civilizations

## How to Use

1. **Navigation**: Use mouse to rotate, scroll to zoom, and right-click drag to pan
2. **View Controls**: Focus on Earth or view the entire galaxy using the buttons
3. **Drake Equation**: Adjust sliders to modify equation parameters:
   - R* = Average rate of star formation (stars/year)
   - fp = Fraction of stars with planets
   - ne = Average habitable planets per star
   - fl = Fraction of habitable planets with life
   - fi = Fraction of life that develops intelligence
   - fc = Fraction of intelligence that develops detectable technology
   - L = Longevity of detectable civilizations (years)
4. **Generate Civilizations**: Click the button to create civilizations based on your parameters
5. **Time Control**: Use the slider or play/pause button to control simulation progression
6. **Reset**: Return all civilizations to their original state

## Simulation Details

- Each civilization starts with a random tech level and aggressiveness factor
- Spheres of influence expand at different rates based on civilization parameters
- Takeovers are determined by comparing tech levels and aggressiveness
- Color mixing reflects the history of conquests and mergers
- Time controls allow exploration of different expansion scenarios

## Technologies Used

- Three.js for 3D visualization
- JavaScript for simulation logic
- HTML/CSS for UI and controls

## Getting Started

1. Clone the repository
2. Open index.html in a modern web browser
3. No build process or dependencies to install - just open and explore!

## License

This project is open source and available for educational and personal use.
