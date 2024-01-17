# L-Systems

This is a Software to construct and visualize 2D-L-Systems in a playful manner; find it at <https://rue-a.github.io/L-Systems/>.

It uses Bootstrap (<https://getbootstrap.com/>) and p5js (<https://p5js.org/reference/#/p5/color>).

## What is an L-System?

Originally developed by Aristid Lindenmayer in 1968, an L-System is a formalism to generate self-similar structures. Although, L-Systems are capable of generating famous fractals like the Sierpinski Triangle (Axiom: FXF--FF--FF, F ↦ FF, X ↦ --FXF++FXF++FXF--, angle = 60) or the Gosper Curve (Axiom: FX, X ↦ FX-FY--FY+FX++FXFX+FY-, Y ↦ +FX-FYFY--FY-FX++FX+FY, angle = 60), first and foremost, they were developed to visually model the growth of plants. However, L-systems are not suited to model the actual anatomics of plants or to simulate the biological processes that govern their groth; despite some striking visual similarities: plants are not fractals.

The algorithm itself is pretty simple: The model is represented by a string, in which the axiom represents the initial state of the model. On each iteration, every character of the current string (the axiom in the first iteration), is replaced by a string of characters that is defined by the according reproduction rules. E.g. Axiom: F, F-Reproduction: F ↦ FX, X-Reproduction: X ↦ F- leads to the following series of strings: F, FX, FXF-, FXF-FX-, FXF-FX-FXF--, … .

A visualization can be achieved by interpreting the current string as a turtle-graphic. "F" means: Move forward by a constant length and draw a line; "f" means: Move forward by the same constant length and don't draw a line; "+" means: Turn right by a given angle, "-" means: Turn left by the same angle. The symbol "[" stores the current position and angle, whereas the symbol "]" restores the last position and angle, i.e. jumps back to the last "[". Every other character is simply ignored.

For a deep dive in L-Systems turn to [The Algorithmic Beauty of Plants](http://algorithmicbotany.org/papers/abop/abop.pdf) by Przemysław Prusinkiewicz and Aristid Lindenmayer. The article [Fern leaves and cauliflower curds are not fractals](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3419012/) by Simcha Lev-Yadun discusses the misconception of setting two processes equal by comparing their results.
