import * as window from "./lovr-window";
import * as keyboard from "./keyboard";

let world: World;
let boxes: Array<Collider> = [];

let maximized = false;

keyboard.setKeyPressedCallback("f11", () => {
  if (maximized) {
    window.restore();
    maximized = false;
  } else {
    window.maximize();
    maximized = true;
  }
});

keyboard.setKeyPressedCallback("escape", () => {
  lovr.event.quit();
});

lovr.load = () => {
  // const [displayWidth, displayHeight] = window.getDisplayDimensions(1);
  // window.setMode(displayWidth / 2, displayHeight / 2);
  // window.maximize();


  // todo: Make this some kind of physics module or something.
  world = lovr.physics.newWorld();
  let ground = world.newBoxCollider(0, 0, 0, 10, 1, 10);
  ground.setKinematic(true);
  boxes.push(ground);

  boxes.push(world.newCapsuleCollider(0, 2, -3, 0.5, 1));

  boxes.push(world.newCylinderCollider(-2, 2, -3, 0.5, 1));

  boxes.push(world.newSphereCollider(-4, 2, -3, 0.5));

  window.togg
};

lovr.update = (delta: number) => {
  keyboard._internalKeyboardUpdateDoNotUse();

  // If the FPS goes too low, the physics completely freaks out.
  // delta < 0.016 ? 0.016 : delta
  const fps = lovr.timer.getFPS();
  print(fps);
  world.update(fps < 30 ? 1 / 30 : 1 / fps);
};

const colors: Array<Vec3> = [
  lovr.math.newVec3(1.0, 0.0, 0.0),
  lovr.math.newVec3(0.0, 1.0, 0.0),
  lovr.math.newVec3(0.0, 0.0, 1.0),
  lovr.math.newVec3(1.0, 1.0, 0.0),
  lovr.math.newVec3(1.0, 0.0, 1.0),
  lovr.math.newVec3(0.0, 1.0, 1.0),
  lovr.math.newVec3(0.5, 1.0, 0.0),
  lovr.math.newVec3(1.0, 0.5, 0.0),
  lovr.math.newVec3(0.5, 0.0, 1.0),
  lovr.math.newVec3(0.5, 1.0, 0.5)
];

lovr.draw = (pass: Pass) => {

  let index = colors.length - 1;

  // Draw the shapes in the world.
  for (const box of Object.values(boxes)) {

    const selectedColor = colors[index % colors.length];

    pass.setColor(selectedColor.x, selectedColor.y, selectedColor.z);

    let shape: Shape = box.getShapes()[0];
    let [x, y, z, angle, angleX, angleY, angleZ] = box.getPose();
    switch (shape.getType()) {
      case "box": {
        const [sizeX, sizeY, sizeZ] = (shape as BoxShape).getDimensions();
        pass.box(x, y, z, sizeX, sizeY, sizeZ, angle, angleX, angleY, angleZ, "line");
        break;
      }
      case "capsule": {
        let radius = (shape as CapsuleShape).getRadius();
        let length = (shape as CapsuleShape).getLength();
        pass.capsule(x, y, z, radius, length, angle, angleX, angleY, angleZ, 32);
        break;
      }
      case "cylinder": {
        let radius = (shape as CylinderShape).getRadius();
        let length = (shape as CylinderShape).getLength();
        pass.cylinder(x, y, z, radius, length, angle, angleX, angleY, angleZ, true, 0, 2 * math.pi, 64);
        break;
      }
      case "sphere": {
        let radius = (shape as SphereShape).getRadius();
        pass.sphere(x, y, z, radius, angle, angleX, angleY, angleZ, 48, 24);
        break;
      }
    }

    index += 1;
  }
};


// lovr.errhand = (message: string): (() => string | null) => {
//   return () => {
//     print(message);
//     return "";
//   };
// };