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
  world = lovr.physics.newWorld(0, -9.81, 0, false, ["car", "wheel", "hub", "steering", "wall", "ground"]);

  // throw error("was creating a hub for the rear wheels");

  // throw error("was creating a hinge joint with a hub for the front wheels");

  world.disableCollisionBetween("car", "wheel");
  world.disableCollisionBetween("wheel", "wall");
  world.disableCollisionBetween("hub", "steering");
  world.disableCollisionBetween("hub", "wheel");
  world.disableCollisionBetween("hub", "car");
  world.disableCollisionBetween("steering", "wheel");


  // world.disableCollisionBetween("hub", "ground");

  const groundWidth = 10;
  let ground = world.newBoxCollider(0, 0, 0, 10, 1, 10);
  ground.setPosition(0, -1, 0);
  ground.setKinematic(true);
  ground.setTag("ground");
  boxes.push(ground);

  // -z is right.
  // -x is forward.

  const basePos = lovr.math.newVec3(0, 0, 0);
  const carWidth = 2;
  const carHeight = 1;
  const carLength = 4;

  const wheelRadius = 0.4;
  const wheelWidth = 0.4;

  // todo: this can be turned into an api for making custom cars. :)

  let car: Collider = world.newBoxCollider(basePos.x, basePos.y, basePos.z, carLength, carHeight, carWidth);
  car.setTag("car");
  // car.setKinematic(true);
  print("car weight", crownVicWeight);
  car.setMass(crownVicWeight);
  // print(car.getAutomaticMass())

  const springHeight = 0.3;

  const hubSize = 0.4;

  // Back left wheel hub.
  let hubRearLeft = world.newCylinderCollider(basePos.x + (carLength / 2) - (wheelRadius * 2), basePos.y - (carHeight / 2.0) - springHeight, basePos.z + (carWidth / 2) - (wheelWidth / 2), hubSize, hubSize);
  hubRearLeft.setTag("hub");
  hubRearLeft.setMass(calculateWheelWeight(wheelRadius, wheelWidth));
  // hubRearLeft.setFriction(0);

  // Back right wheel hub.
  let hubRearRight = world.newCylinderCollider(basePos.x + (carLength / 2) - (wheelRadius * 2), basePos.y - (carHeight / 2.0) - springHeight, basePos.z - (carWidth / 2) + (wheelWidth / 2), hubSize, hubSize);
  hubRearRight.setTag("hub");
  hubRearRight.setMass(calculateWheelWeight(wheelRadius, wheelWidth));
  // hubRearLeft.setFriction(0);


  // Back left wheel hub.
  let hubFrontLeft = world.newCylinderCollider(basePos.x - (carLength / 2) + (wheelRadius * 2), basePos.y - (carHeight / 2.0) - springHeight, basePos.z + (carWidth / 2) - (wheelWidth / 2), hubSize, hubSize);
  hubFrontLeft.setTag("hub");
  hubFrontLeft.setMass(calculateWheelWeight(wheelRadius, wheelWidth));
  // hubRearLeft.setFriction(0);

  // Back right wheel hub.
  let hubFrontRight = world.newCylinderCollider(basePos.x - (carLength / 2) + (wheelRadius * 2), basePos.y - (carHeight / 2.0) - springHeight, basePos.z - (carWidth / 2) + (wheelWidth / 2), hubSize, hubSize);
  hubFrontRight.setTag("hub");
  hubFrontRight.setMass(calculateWheelWeight(wheelRadius, wheelWidth));
  // hubRearLeft.setFriction(0);

  const springStrength = 4;
  const springShock = 80;
  const springDamping = 40;
  const springTravel = 0.0001;

  let springRearLeft: SliderJoint = lovr.physics.newSliderJoint(hubRearLeft, car, 0, 1, 0);
  springRearLeft.setSpring(springStrength, springShock / 100);
  springRearLeft.setLimits(-springTravel, springTravel);
  springRearLeft.setFriction(springDamping);

  let springRearRight: SliderJoint = lovr.physics.newSliderJoint(hubRearRight, car, 0, 1, 0);
  springRearRight.setSpring(springStrength, springShock / 100);
  springRearRight.setLimits(-springTravel, springTravel);
  springRearRight.setFriction(springDamping);


  let springFrontLeft: SliderJoint = lovr.physics.newSliderJoint(hubFrontLeft, car, 0, 1, 0);
  springFrontLeft.setSpring(springStrength, springShock / 100);
  springFrontLeft.setLimits(-springTravel, springTravel);
  springFrontLeft.setFriction(springDamping);

  let springFrontRight: SliderJoint = lovr.physics.newSliderJoint(hubFrontRight, car, 0, 1, 0);
  springFrontRight.setSpring(springStrength, springShock / 100);
  springFrontRight.setLimits(-springTravel, springTravel);
  springFrontRight.setFriction(springDamping);

  boxes.push(hubRearLeft);
  boxes.push(hubRearRight);
  boxes.push(hubFrontLeft);
  boxes.push(hubFrontRight);
  boxes.push(car);

  keyboard.setKeyDownCallback("space", () => {
    // car.setPosition(math.random(), 3 + math.random(), math.random());
    // car.setAngularVelocity(0, 1, 0);
    car.setLinearVelocity(0, 1, 0);

    // wheelRearLeft.applyTorque(10000, 0, 0);
    // wheelFrontLeft.applyForce(0, 10000, 0);

    // throw error("Needs a hub shape and a ")


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
  ["car", lovr.math.newVec3(1.0, 0.0, 0.5)],
  ["hub", lovr.math.newVec3(1.0, 0.0, 0.0)]
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