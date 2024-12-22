import * as window from "./lovr-window";
import * as keyboard from "./keyboard";

let world: World;
let boxes: Array<Collider> = [];

let maximized = false;

const font = lovr.graphics.getDefaultFont();
font.setPixelDensity(1);

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

const lbsToKg = 2.205;
const kgToInverseNewton = 9.80665;
const scale = 10;

/**
 * This function attempts to scale the car's body as to not destroy the physics engine.
 * @param inputLBS The weight in pounds.
 * @returns The scaled weight so the engine doesn't blow up.
 */
function scalePoundsToRc(inputLBS: number): number {
  return (inputLBS / lbsToKg) / scale;
}

const rubberDensity = 1522 / 3;
function calculateWheelWeight(radius: number, width: number): number {
  // I just grabbed this from here lol. https://www.vcalc.com/wiki/cylinder-weight
  // We're using the density of rubber which is 1522kg which I found here: https://www.aqua-calc.com/page/density-table/substance/rubber-coma-and-blank-manufactured
  // I had to adjust the calculation because jolt physics acts really strangely with different masses.
  return (math.pi * (radius * radius) * width) * rubberDensity;
}

lovr.load = () => {
  // const [displayWidth, displayHeight] = window.getDisplayDimensions(1);
  // window.setMode(displayWidth / 2, displayHeight / 2);
  // window.maximize();

  const crownVicWeight = scalePoundsToRc(4129);

  // todo: Make this some kind of physics module or something.
  world = lovr.physics.newWorld(0, -9.81, 0, false, ["car", "wheel", "wall", "ground"]);

  world.disableCollisionBetween("car", "wheel");
  world.disableCollisionBetween("wheel", "wall");

  const groundWidth = 10;
  let ground = world.newBoxCollider(0, 0, 0, 10, 1, 10);
  ground.setKinematic(true);
  ground.setTag("ground");
  boxes.push(ground);

  // -z is forward.
  // -x is left.

  const basePos = lovr.math.newVec3(0, 2, -1);
  const carWidth = 2;
  const carHeight = 1;
  const carLength = 4;

  const wheelRadius = 0.4;
  const wheelWidth = 0.4;

  // todo: this can be turned into an api for making custom cars. :)

  let car: Collider = world.newBoxCollider(basePos.x, basePos.y, basePos.z, carWidth, carHeight, carLength);
  car.setTag("car");
  // car.setKinematic(true);
  print("car weight", crownVicWeight);
  car.setMass(crownVicWeight);

  const springHeight = 0.3;

  // Back left wheel.
  let wheelRearLeft = world.newCylinderCollider(basePos.x - (carWidth / 2) + (wheelWidth / 2), basePos.y - (carHeight / 2.0) - springHeight, basePos.z + (carLength / 2) - (wheelRadius * 2), wheelRadius, wheelWidth);
  wheelRearLeft.setOrientation(math.pi / 2, 0, 1, 0);
  wheelRearLeft.setTag("wheel");
  wheelRearLeft.setMass(calculateWheelWeight(wheelRadius, wheelWidth));
  wheelRearLeft.setFriction(0.1);

  // Back right wheel.
  let wheelRearRight = world.newCylinderCollider(basePos.x + (carWidth / 2) - (wheelWidth / 2), basePos.y - (carHeight / 2.0) - springHeight, basePos.z + (carLength / 2) - (wheelRadius * 2), wheelRadius, wheelWidth);
  wheelRearRight.setOrientation(math.pi / 2, 0, 1, 0);
  wheelRearRight.setTag("wheel");
  wheelRearRight.setMass(calculateWheelWeight(wheelRadius, wheelWidth));
  wheelRearRight.setFriction(0.1);

  const springStrength = 4;
  const springShock = 80;
  const springDamping = 40;
  const springTravel = 0.0001;

  let springRearLeft: SliderJoint = lovr.physics.newSliderJoint(wheelRearLeft, car, 0, 1, 0);
  springRearLeft.setSpring(springStrength, springShock / 100);
  springRearLeft.setLimits(-springTravel, springTravel);
  springRearLeft.setFriction(springDamping);

  let springRerRight: SliderJoint = lovr.physics.newSliderJoint(wheelRearRight, car, 0, 1, 0);
  springRerRight.setSpring(springStrength, springShock / 100);
  springRerRight.setLimits(-springTravel, springTravel);
  springRerRight.setFriction(springDamping);



  boxes.push(wheelRearLeft);
  boxes.push(wheelRearRight);
  boxes.push(car);

  keyboard.setKeyDownCallback("space", () => {
    // car.setPosition(math.random(), 3 + math.random(), math.random());
    // car.setAngularVelocity(0, 1, 0);
    car.setLinearVelocity(0, 1, 0);
  });

  keyboard.setKeyDownCallback("f", () => {
    const k = car.isKinematic();
    car.setKinematic(!k);
  });
};

const MIN_FPS = 30;
const MAX_DELTA = 1 / 30;
const MAX_FPS = 200;
const MIN_DELTA = 1 / 200;
let deltaTimer = 0;

lovr.update = (delta: number) => {
  keyboard._internalKeyboardUpdateDoNotUse();

  if (delta > MAX_DELTA) {
    world.update(MAX_DELTA);
    // We are no longer within spec, we must reset the timer.
    deltaTimer = 0;
  } else {
    deltaTimer += delta;
    if (deltaTimer > MIN_DELTA) {
      world.update(deltaTimer);
      // If the FPS is less than 200, we can use it.
      deltaTimer -= (delta > MIN_DELTA ? delta : MIN_DELTA);
    }
  }
};

// const colors: Array<Vec3> = [
//   lovr.math.newVec3(1.0, 0.0, 0.0),
//   lovr.math.newVec3(0.0, 1.0, 0.0),
//   lovr.math.newVec3(0.0, 0.0, 1.0),
//   lovr.math.newVec3(1.0, 1.0, 0.0),
//   lovr.math.newVec3(1.0, 0.0, 1.0),
//   lovr.math.newVec3(0.0, 1.0, 1.0),
//   lovr.math.newVec3(0.5, 1.0, 0.0),
//   lovr.math.newVec3(1.0, 0.5, 0.0),
//   lovr.math.newVec3(0.5, 0.0, 1.0),
//   lovr.math.newVec3(0.5, 1.0, 0.5)
// ];

const colorMap = new Map<string, Vec3>([
  ["ground", lovr.math.newVec3(1, 1, 1)],
  ["wheel", lovr.math.newVec3(0.3, 0.3, 0.3)],
  ["car", lovr.math.newVec3(1.0, 0.0, 0.5)]
]);

lovr.draw = (pass: Pass) => {

  // let index = colors.length - 1;

  // Draw the shapes in the world.
  for (const box of Object.values(boxes)) {

    // const selectedColor = colors[index % colors.length];

    // pass.setColor(selectedColor.x, selectedColor.y, selectedColor.z);

    for (const shape of Object.values(box.getShapes())) {
      let [x, y, z, angle, angleX, angleY, angleZ] = box.getPose();

      const tag = shape.getCollider().getTag();
      const selectedColor = colorMap.get(tag)!!;

      // print(selectedColor);
      pass.setColor(selectedColor.x, selectedColor.y, selectedColor.z);

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
          pass.cylinder(x, y, z, radius, length, angle, angleX, angleY, angleZ, false, 0, 2 * math.pi, 64);
          break;
        }
        case "sphere": {
          let radius = (shape as SphereShape).getRadius();
          pass.sphere(x, y, z, radius, angle, angleX, angleY, angleZ, 48, 24);
          break;
        }
      }
      // index += 1;
    }
  }


  pass.setColor(1, 1, 1);

  // Just draw the FPS for now.
  const [width, height] = lovr.system.getWindowDimensions();
  // todo: I didn't even know this was a function.
  const projection = lovr.math.mat4().orthographic(0, width, 0, height, -10, 10);

  pass.setViewPose(1, lovr.math.mat4().identity());
  pass.setProjection(1, projection);
  pass.setDepthTest();

  const scale = 2;
  const fpsString = "FPS: " + lovr.timer.getFPS();
  const fontWidth = font.getWidth(fpsString) * scale;
  const fontHeight = font.getHeight() * scale;

  pass.text(fpsString, fontWidth, fontHeight, 0, 4);


};


// lovr.errhand = (message: string): (() => string | null) => {
//   return () => {
//     print(message);
//     return "";
//   };
// };