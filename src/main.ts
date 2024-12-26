import * as window from "./lovr-window";
import * as keyboard from "./keyboard";

let world: World;
let boxes: Array<Collider> = [];
let globalDelta = 0.0;
let recenterFunc: () => void;
let steeringJointCount = 30;
let wheelFriction = 1;
let wheelMass = 0.9;

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

const rubberDensity = 1522 / 6;
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
  world = lovr.physics.newWorld(0, -9.81, 0, false, ["body", "wheel", "suspension", "steering", "wall", "ground"]);

  // throw error("was creating a hub for the rear wheels");

  // throw error("was creating a hinge joint with a hub for the front wheels");

  world.disableCollisionBetween("body", "wheel");
  world.disableCollisionBetween("body", "suspension");
  world.disableCollisionBetween("wheel", "wall");
  world.disableCollisionBetween("wheel", "suspension");
  world.disableCollisionBetween("suspension", "wall");
  world.disableCollisionBetween("steering", "wheel");
  world.disableCollisionBetween("steering", "wall");
  world.disableCollisionBetween("steering", "ground");
  world.disableCollisionBetween("steering", "suspension");
  world.disableCollisionBetween("steering", "body");

  // world.disableCollisionBetween("suspension", "ground");


  // world.disableCollisionBetween("hub", "ground");

  const groundWidth = 1000;
  let ground = world.newBoxCollider(0, 0, 0, groundWidth, 1, groundWidth);
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

  const suspension: Collider = world.newBoxCollider(basePos.x, basePos.y, basePos.z, carLength, 0.3, carWidth);
  suspension.setTag("suspension");
  suspension.setMass(wheelMass);

  //* REAR LEFT WHEEL.

  const rearLeftWheelPosition = lovr.math.vec3(basePos.x + (carLength / 2) - (wheelRadius * 2), basePos.y, basePos.z + (carWidth / 2) - (wheelWidth / 2));
  const rearLeftWheel = world.newCylinderCollider(rearLeftWheelPosition, wheelRadius, wheelWidth);
  rearLeftWheel.setTag("wheel");
  rearLeftWheel.setMass(wheelMass);
  rearLeftWheel.setFriction(wheelFriction);

  const rearLeftWheelAxle: HingeJoint = lovr.physics.newHingeJoint(suspension, rearLeftWheel, rearLeftWheelPosition, lovr.math.vec3(0, 0, 1));

  //* REAR RIGHT WHEEL.

  const rearRightWheelPosition = lovr.math.vec3(basePos.x + (carLength / 2) - (wheelRadius * 2), basePos.y, basePos.z - (carWidth / 2) + (wheelWidth / 2));
  const rearRightWheel = world.newCylinderCollider(rearRightWheelPosition, wheelRadius, wheelWidth);
  rearRightWheel.setTag("wheel");
  rearRightWheel.setMass(wheelMass);
  rearRightWheel.setFriction(wheelFriction);

  const rearRightWheelAxle: HingeJoint = lovr.physics.newHingeJoint(suspension, rearRightWheel, rearRightWheelPosition, lovr.math.vec3(0, 0, 1));

  const steeringTorque = 9999999999999;

  //* FRONT LEFT WHEEL.

  //? Steering.

  const frontLeftWheelPosition = lovr.math.vec3(basePos.x - (carLength / 2) + (wheelRadius * 2), basePos.y, basePos.z + (carWidth / 2) - (wheelWidth / 2));

  const frontLeftWheelSteering = world.newBoxCollider(basePos.x - (carLength / 2) + (wheelRadius * 2), basePos.y, basePos.z + (carWidth / 2) - (wheelWidth / 2), 0.4, 0.4, 0.4);
  frontLeftWheelSteering.setTag("steering");
  frontLeftWheelSteering.setMass(wheelMass);

  const frontLeftSteeringBasePosition = lovr.math.vec3(frontLeftWheelPosition.x, frontLeftWheelPosition.y, frontLeftWheelPosition.z - 0.2);

  //! This is an entire roll of duct tape to fix weirdness with lovr physics lol.
  let frontLeftSteeringJoints: Array<HingeJoint> = [];
  for (let i = 0; i < steeringJointCount; i++) {
    frontLeftSteeringJoints.push(lovr.physics.newHingeJoint(suspension, frontLeftWheelSteering, frontLeftSteeringBasePosition, lovr.math.vec3(0, -1, 0)));
    frontLeftSteeringJoints[i].setMotorMode("position");
    frontLeftSteeringJoints[i].setLimits(-math.pi / 8, math.pi / 8);
    frontLeftSteeringJoints[i].setMaxMotorTorque(steeringTorque, steeringTorque);
    frontLeftSteeringJoints[i].setMotorTarget(0);
    frontLeftSteeringJoints[i].setSpring(1000000, 1);
  }

  //? Actual wheel.

  const frontLeftWheel = world.newCylinderCollider(frontLeftWheelPosition, wheelRadius, wheelWidth);
  frontLeftWheel.setTag("wheel");
  frontLeftWheel.setMass(wheelMass);
  frontLeftWheel.setFriction(wheelFriction);

  const frontLeftWheelAxle: HingeJoint = lovr.physics.newHingeJoint(frontLeftWheelSteering, frontLeftWheel, frontLeftWheelPosition, lovr.math.vec3(0, 0, 1));
  frontLeftWheelAxle.setSpring(100, 1);

  //* FRONT RIGHT WHEEL.

  //? Steering.

  const frontRightWheelPosition = lovr.math.vec3(basePos.x - (carLength / 2) + (wheelRadius * 2), basePos.y, basePos.z - (carWidth / 2) + (wheelWidth / 2));

  const frontRightWheelSteering = world.newBoxCollider(basePos.x - (carLength / 2) + (wheelRadius * 2), basePos.y, basePos.z - (carWidth / 2) + (wheelWidth / 2), 0.4, 0.4, 0.4);
  frontRightWheelSteering.setTag("steering");
  frontRightWheelSteering.setMass(wheelMass);

  const frontRightSteeringBasePosition = lovr.math.vec3(frontRightWheelPosition.x, frontRightWheelPosition.y, frontRightWheelPosition.z - 0.2);

  let frontRightSteeringJoints: Array<HingeJoint> = [];
  for (let i = 0; i < steeringJointCount; i++) {
    frontRightSteeringJoints.push(lovr.physics.newHingeJoint(suspension, frontRightWheelSteering, frontRightSteeringBasePosition, lovr.math.vec3(0, -1, 0)));
    frontRightSteeringJoints[i].setMotorMode("position");
    frontRightSteeringJoints[i].setLimits(-math.pi / 8, math.pi / 8);
    frontRightSteeringJoints[i].setMaxMotorTorque(steeringTorque, steeringTorque);
    frontRightSteeringJoints[i].setMotorTarget(0);
    frontRightSteeringJoints[i].setSpring(1000000, 1);
  }

  //? Actual wheel.

  const frontRightWheel = world.newCylinderCollider(frontRightWheelPosition, wheelRadius, wheelWidth);
  frontRightWheel.setTag("wheel");
  frontRightWheel.setMass(wheelMass);
  frontRightWheel.setFriction(wheelFriction);

  const frontRightWheelAxle: HingeJoint = lovr.physics.newHingeJoint(frontRightWheelSteering, frontRightWheel, frontRightWheelPosition, lovr.math.vec3(0, 0, 1));
  frontRightWheelAxle.setSpring(100, 1);

  //* RENDERING.

  boxes.push(suspension);
  boxes.push(rearLeftWheel);
  boxes.push(rearRightWheel);
  boxes.push(frontLeftWheel);
  boxes.push(frontLeftWheelSteering);
  boxes.push(frontRightWheel);
  boxes.push(frontRightWheelSteering);

  keyboard.setKeyDownCallback("space", () => {
    // suspension.setAngularVelocity(0, 1, 0);
    // frontLeftWheel.setLinearVelocity(1, 0, 0);
    // frontLeftWheelAxle.
    rearLeftWheelAxle.setMotorMode("velocity");
    rearLeftWheelAxle.setMaxMotorTorque(10, 10);
    rearLeftWheelAxle.setMotorTarget(100);

    rearRightWheelAxle.setMotorMode("velocity");
    rearRightWheelAxle.setMaxMotorTorque(10, 10);
    rearRightWheelAxle.setMotorTarget(100);
  });

  keyboard.setKeyReleasedCallback("space", () => {
    rearLeftWheelAxle.setMotorTarget(0);
    rearRightWheelAxle.setMotorTarget(0);
  });

  let angle = 0;
  let steeringSpeed = 1;
  let gateLeft = false;
  let gateRight = false;

  recenterFunc = () => {
    print(angle);
    if (!gateLeft && !gateRight) {
      print("recenter!");
      angle = 0;

      for (let i = 0; i < steeringJointCount; i++) {
        frontLeftSteeringJoints[i].setMotorTarget(angle);
        frontRightSteeringJoints[i].setMotorTarget(angle);
      }
    } else {
      print("nah");
    }
  };

  keyboard.setKeyDownCallback("l", () => {
    angle -= globalDelta * steeringSpeed;
    if (angle > 0) {
      angle = 0;
    }
    if (angle < -math.pi / 8) {
      angle = -math.pi / 8;
    }
    for (let i = 0; i < steeringJointCount; i++) {
      frontLeftSteeringJoints[i].setMotorTarget(angle);
      frontRightSteeringJoints[i].setMotorTarget(angle);
    }
    gateLeft = true;
  });

  keyboard.setKeyReleasedCallback("l", () => {
    gateLeft = false;
  });

  keyboard.setKeyDownCallback("'", () => {
    angle += globalDelta * steeringSpeed;
    if (angle < 0) {
      angle = 0;
    }
    if (angle > math.pi / 8) {
      angle = math.pi / 8;
    }
    for (let i = 0; i < steeringJointCount; i++) {
      frontLeftSteeringJoints[i].setMotorTarget(angle);
      frontRightSteeringJoints[i].setMotorTarget(angle);
    }
    gateRight = true;
  });

  keyboard.setKeyReleasedCallback("'", () => {
    gateRight = false;

  });
};

const MIN_FPS = 30;
const MAX_DELTA = 1 / 30;
const MAX_FPS = 200;
const MIN_DELTA = 1 / 200;
let deltaTimer = 0;

lovr.update = (delta: number) => {
  globalDelta = delta;
  keyboard._internalKeyboardUpdateDoNotUse();

  recenterFunc();

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
  ["suspension", lovr.math.newVec3(1.0, 0.0, 1.0)],
  ["body", lovr.math.newVec3(1.0, 1.0, 0.0)],
  ["steering", lovr.math.newVec3(0.0, 1.0, 1.0)],
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
      if (tag == null) {
        throw new Error("Need to add in this tag!");
      }
      const selectedColor = colorMap.get(tag);
      if (selectedColor == null) {
        throw new Error("No color for " + tag);
      }

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
          pass.cylinder(x, y, z, radius, length, angle, angleX, angleY, angleZ, false, 0, 2 * math.pi, 12);
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