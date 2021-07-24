import fabric from 'fabric/fabric-impl';
//import { GPSPoint } from './ChallengeConfiguration';

const enum DrawingMode {
    Line
}

interface IOBjectDrawer {
    drawingMode: DrawingMode
    //Makes the current object
   readonly make: (x: number, //lon start point
    y: number, //lat start point
    options: fabric.IObjectOptions,
    x2: number, //lon start point
    y2: number) //lat start point
        => Promise<fabric.Object>;
    
}

class LineDrawer implements IOBjectDrawer {
    drawingMode: DrawingMode = DrawingMode.Line;
    make(x: number, y: number, options: fabric.IObjectOptions, x2: number, y2: number): Promise<fabric.Object> {
        //Return a Promise that will draw a line
        return new Promise<fabric.Object>(resolve => {
            //Inside the Promise, draw the actual line from (x,y) to (x2,y2)
            resolve(new fabric.Line([x, y, x2, y2], options));
        });
    }

    resize(object: fabric.Line, x: number, y: number): Promise<fabric.Object> {
        //Change the secondary point (x2, y2) of the object 
        //This resizes the object between starting point (x,y)
        //and secondary point (x2,y2), where x2 and y2 have new values.
        object.set({
            x2: x,
            y2: y
        }).setCoords();
         //Wrap the resized object in a Promise
        return new Promise<fabric.Object>(resolve => {
            resolve(object);
        });
    }
}

export { LineDrawer };