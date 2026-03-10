import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // ১. Directional Light কনফিগারেশন
  const directionalLight = new THREE.DirectionalLight(0x5eead4, 0);
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);

  // ২. Point Light কনফিগারেশন
  const pointLight = new THREE.PointLight(0x22d3ee, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // ৩. RGBELoader দিয়ে HDR লোড করা
  const rgbeLoader = new RGBELoader();

  // সরাসরি পূর্ণাঙ্গ পাথ ব্যবহার করুন যাতে পাথ ভুল হওয়ার সুযোগ না থাকে
  rgbeLoader.load(
    "/models/env_map.hdr?v=1",
    (texture) => {
      console.log("HDR লোড হয়েছে!");
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    },
    // লোডিং প্রগ্রেস দেখার জন্য
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // এরর হ্যান্ডলিং
    (err) => {
      console.error("HDR লোড হতে ব্যর্থ হয়েছে! দয়া করে পাথ চেক করুন।", err);
    }
  );

  function setPointLight(screenLight: THREE.Mesh | undefined | null) {
    if (screenLight && screenLight.material) {
      const mat = screenLight.material as THREE.MeshStandardMaterial;
      if (mat.opacity > 0.9) {
        pointLight.intensity = mat.emissiveIntensity * 20;
      } else {
        pointLight.intensity = 0;
      }
    }
  }

  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.64,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to(directionalLight, {
      intensity: 1,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;