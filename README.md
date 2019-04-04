# Homework 6: City Generation

For this assignment, you will generate a collection of 3D buildings within the road networks you created for the previous assignment.

For this assignment, you will generate a network of roads to form the basis of a city using a modified version of L-systems. As in homework 4, you will be using instanced rendering to draw your road networks.

## Provided Resources
You can use any base code for this assignment, so we haven't provided
anything specific for you. We have included the paper [Real-time Procedural Generation of 'Pseudo Infinite' Cities](procedural_infinite_cities.pdf) for your reference. For visual inspiration, you might refer to Emily's [City Forgery](http://www.emilyhvo.com/city-forgery/) project.

## Assignment Requirements
#### 3D MODEL OF TERRAIN
This 3D model was generated based on the image of the previous homework map.  I incorporated a subdivided plane which I modified with Maya, to give some landscaping around the edges as opposed to totally flat terrain. 
#### ROADS
For the road segments, I used a rectangular prism OBJ file similar to how I used plant leaf OBJ files for homework 4.   Having built the plane off of an instance of running the previous homework, I stored one set of edges so that the roads are consistent each time the program is run.

![](city.PNG)

#### 2D GRID
On the CPU, I created a high-resolution 2D grid that spans the terrain for the scene. The points where the road and water exist are stored as invalid areas, where a building will not be placed if the user tries to put a building there randomly.  I was able to visualize this 2D grid by using a checkered shader as a guide for building placement.  Below, you can visualize the initial grid setup with several buildings placed in the scene.
![](grid.PNG)

#### RANDOM POINTS
I treated the "city" and "towns" as separate entities due to their different types of buildings.
For the towns, I randomly generated points along the x and z axis.  If this point fell too close to the x or y of any of the city block roads, this point was discarded, and another new random point was tried.  For the most part, you will find that the smaller buildings effectively appear in valid terrain space. 
With more time, I would hope to improve my intersection testing to ensure no buildings ever cross the roads, but there is occasional overlap due to random width and length of the building bases.

![](town.PNG)

Generate a collection of randomly scattered 2D points in your building placement validity grid, removing any points that fall within cells already occupied by roads or water. At each of these points, you will place a building generated based on the specifications in the next section.
- __(20 points)__ To create building geometry, you will follow the method illustrated in figure 3 of [Real-time Procedural Generation of 'Pseudo Infinite' Cities](procedural_infinite_cities.pdf). Beginning at a predetermined top height, generate some n-sided polygon and extrude it downward a certain distance. After creating this first layer, create an additional layer beneath it that has the form of two polygons combined together and extruded downward. Repeat until your building has reached the ground. You will be creating the structure of these buildings as VBO data on the CPU.
- __(25 points)__ Once you have the basics of building generation working, you will need to refine your algorithm to create art-directed procedural buildings. Your city should contain buildings that follow these guidelines:
  - Buildings in your city should not be uniform in appearance. The higher the city's population density, the more the buildings should resemble skyscrapers. In areas of lower density, the buildings should be shorter and look more residential. Think office buildings versus row homes. Areas of medium population should contain buildings that are of medium height and which look more like multi-story offices or shops. Don't feel constrained by the building generation algorithm from the previous section; add slanted roofs and other features to your buildings if you wish.
  - The texturing of your buildings should be procedurally generated within a shader. Use all of the techniques you practiced in the first three homework assignments to polish your buildings' appearances. The overall aesthetic of your city is up to you (e.g. cyberpunk versus modern versus renaissance) but the procedural texturing should look intentional. Include windows, doors, lights, and other details you deem necessary to make your buildings look natural.
- __(10 points)__ Make use of artistic lighting as we discussed during the environmental setpiece assignment. You should include several directional lights, as discussed in [IQ's article on artistic lighting](http://iquilezles.org/www/articles/outdoorslighting/outdoorslighting.htm), to ensure your scene has adequate illumination. There should never be any purely black shadows in your scene.
- __(5 points)__ Your scene should include a procedural sky background as so many of your other assignments have. Make sure it is congruent with your lighting setup and the aesthetics of your city.
- __(10 points)__ Following the specifications listed
[here](https://github.com/pjcozzi/Articles/blob/master/CIS565/GitHubRepo/README.md),
create your own README.md, renaming the file you are presently reading to
INSTRUCTIONS.md. Don't worry about discussing runtime optimization for this
project. Make sure your README contains the following information:
    - Your name and PennKey
    - Citation of any external resources you found helpful when implementing this
    assignment.
    - A link to your live github.io demo (refer to the pinned Piazza post on
      how to make a live demo through github.io)
    - An explanation of the techniques you used to generate your L-System features.
    Please be as detailed as you can; not only will this help you explain your work
    to recruiters, but it helps us understand your project when we grade it!


## Extra Credit (Up to 20 points)
- If you did not do so for the previous assignment, implement additional road layouts as described in Procedural Modeling of Cities
  - Radial road networking: The main roads follow radial tracks around some predefined centerpoint
  - Elevation road networking: Roads follow paths of least elevation change
- Use shape grammars to further refine the structure of your buildings
- Create fully 3D terrain and adjust the placement of your buildings and roads based on the slope of your terrain.
- In the vein of Emily's procedural city, use the BioCrowds algorithm to create agents that seek some goal point by navigating the terrain covered by roads. 
- Add any polish features you'd like to make your visual output more interesting
