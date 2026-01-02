import { useEffect, useRef } from 'react';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector2,
  Vector3,
  Clock
} from 'three';

/**
 * FloatingLines 컴포넌트
 * WebGL 기반 애니메이션 배경 효과
 *
 * Props:
 * @param {array} enabledWaves - 활성화할 웨이브 ['top', 'middle', 'bottom'] [Optional]
 * @param {array|number} lineCount - 웨이브별 라인 수 [Optional, 기본값: [10, 15, 20]]
 * @param {array|number} lineDistance - 웨이브별 라인 간격 [Optional, 기본값: [8, 6, 4]]
 * @param {number} bendRadius - 벤드 반경 [Optional, 기본값: 5.0]
 * @param {number} bendStrength - 벤드 강도 [Optional, 기본값: -0.5]
 * @param {boolean} interactive - 마우스 인터랙션 활성화 [Optional, 기본값: true]
 * @param {boolean} parallax - 패럴랙스 효과 활성화 [Optional, 기본값: true]
 * @param {number} parallaxStrength - 패럴랙스 강도 [Optional, 기본값: 0.1]
 * @param {array} linesGradient - 라인 그라데이션 색상 배열 [Optional]
 * @param {object} topWavePosition - 상단 웨이브 위치 {x, y, rotate} [Optional]
 * @param {object} middleWavePosition - 중간 웨이브 위치 {x, y, rotate} [Optional]
 * @param {object} bottomWavePosition - 하단 웨이브 위치 {x, y, rotate} [Optional]
 */

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec3 iResolution;
uniform float iTime;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

vec3 background_color(vec2 uv) {
  return vec3(0.0);
}

vec3 getLineColor(float t, vec3 fallback) {
  if (lineGradientCount <= 0) return fallback;
  if (lineGradientCount == 1) return lineGradient[0];

  float pos = t * float(lineGradientCount - 1);
  int idx = int(floor(pos));
  float frac = fract(pos);

  idx = min(idx, lineGradientCount - 2);

  return mix(lineGradient[idx], lineGradient[idx + 1], frac);
}

mat2 rotate(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float wave(vec2 uv, float amplitude, vec2 baseUv, vec2 mouseUv, bool isInteractive) {
  float x = uv.x;
  float y = sin(x * 0.3 + iTime * 0.5) * 0.3;
  y += sin(x * 0.7 - iTime * 0.3) * 0.15;
  y += sin(x * 1.1 + iTime * 0.7) * 0.1;
  y *= amplitude * 0.15;

  if (isInteractive && bendInfluence > 0.0) {
    float dist = length(baseUv - mouseUv);
    float influence = smoothstep(bendRadius, 0.0, dist);
    float bendOffset = influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;

  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  if (enableBottom) {
    for (int i = 0; i < 30; ++i) {
      if (i >= bottomLineCount) break;
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);

      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < 30; ++i) {
      if (i >= middleLineCount) break;
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);

      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < 30; ++i) {
      if (i >= topLineCount) break;
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);

      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

const MAX_GRADIENT_STOPS = 8;

function hexToVec3(hex) {
  let value = hex.trim();

  if (value.startsWith('#')) {
    value = value.slice(1);
  }

  let r = 255;
  let g = 255;
  let b = 255;

  if (value.length === 3) {
    r = parseInt(value[0] + value[0], 16);
    g = parseInt(value[1] + value[1], 16);
    b = parseInt(value[2] + value[2], 16);
  } else if (value.length === 6) {
    r = parseInt(value.slice(0, 2), 16);
    g = parseInt(value.slice(2, 4), 16);
    b = parseInt(value.slice(4, 6), 16);
  }

  return new Vector3(r / 255, g / 255, b / 255);
}

function FloatingLines({
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = [10, 15, 20],
  lineDistance = [8, 6, 4],
  bendRadius = 5.0,
  bendStrength = -0.5,
  interactive = true,
  parallax = true,
  parallaxStrength = 0.1,
  linesGradient = ['#D4A537', '#C9963A', '#A67C3D'],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const enableTop = enabledWaves.includes('top');
    const enableMiddle = enabledWaves.includes('middle');
    const enableBottom = enabledWaves.includes('bottom');

    const topLineCount = Array.isArray(lineCount) ? lineCount[0] : lineCount;
    const middleLineCount = Array.isArray(lineCount) ? lineCount[1] : lineCount;
    const bottomLineCount = Array.isArray(lineCount) ? lineCount[2] : lineCount;

    const topLineDistance = Array.isArray(lineDistance) ? lineDistance[0] : lineDistance;
    const middleLineDistance = Array.isArray(lineDistance) ? lineDistance[1] : lineDistance;
    const bottomLineDistance = Array.isArray(lineDistance) ? lineDistance[2] : lineDistance;

    const uniforms = {
      iResolution: { value: new Vector3(1, 1, 1) },
      iTime: { value: 0 },

      enableTop: { value: enableTop },
      enableMiddle: { value: enableMiddle },
      enableBottom: { value: enableBottom },

      topLineCount: { value: topLineCount },
      middleLineCount: { value: middleLineCount },
      bottomLineCount: { value: bottomLineCount },

      topLineDistance: { value: topLineDistance },
      middleLineDistance: { value: middleLineDistance },
      bottomLineDistance: { value: bottomLineDistance },

      topWavePosition: {
        value: new Vector3(
          topWavePosition?.x ?? 10.0,
          topWavePosition?.y ?? 0.5,
          topWavePosition?.rotate ?? -0.4
        )
      },
      middleWavePosition: {
        value: new Vector3(
          middleWavePosition?.x ?? 5.0,
          middleWavePosition?.y ?? 0.0,
          middleWavePosition?.rotate ?? 0.2
        )
      },
      bottomWavePosition: {
        value: new Vector3(
          bottomWavePosition?.x ?? 2.0,
          bottomWavePosition?.y ?? -0.7,
          bottomWavePosition?.rotate ?? 0.4
        )
      },

      iMouse: { value: new Vector2(-1000, -1000) },
      interactive: { value: interactive },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },

      parallax: { value: parallax },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset: { value: new Vector2(0, 0) },

      lineGradient: {
        value: Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(1, 1, 1))
      },
      lineGradientCount: { value: 0 }
    };

    if (linesGradient && linesGradient.length > 0) {
      const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS);
      uniforms.lineGradientCount.value = stops.length;

      stops.forEach((hex, i) => {
        const color = hexToVec3(hex);
        uniforms.lineGradient.value[i].set(color.x, color.y, color.z);
      });
    }

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });

    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const clock = new Clock();

    const setSize = () => {
      const el = containerRef.current;
      if (!el) return;

      const width = el.clientWidth || 1;
      const height = el.clientHeight || 1;

      renderer.setSize(width, height, false);

      const canvasWidth = renderer.domElement.width;
      const canvasHeight = renderer.domElement.height;
      uniforms.iResolution.value.set(canvasWidth, canvasHeight, 1);
    };

    setSize();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(setSize) : null;

    if (ro && containerRef.current) {
      ro.observe(containerRef.current);
    }

    let targetBendInfluence = 0;
    let currentBendInfluence = 0;

    const handlePointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      uniforms.iMouse.value.set(
        x * renderer.getPixelRatio(),
        (rect.height - y) * renderer.getPixelRatio()
      );
      targetBendInfluence = 1;
    };

    const handlePointerLeave = () => {
      targetBendInfluence = 0;
    };

    const handleScroll = () => {
      if (!parallax) return;
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const normalizedScroll = maxScroll > 0 ? scrollY / maxScroll : 0;
      uniforms.parallaxOffset.value.set(
        normalizedScroll * parallaxStrength,
        normalizedScroll * parallaxStrength * 0.5
      );
    };

    if (interactive) {
      renderer.domElement.addEventListener('pointermove', handlePointerMove);
      renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
    }

    if (parallax) {
      window.addEventListener('scroll', handleScroll);
    }

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      uniforms.iTime.value = clock.getElapsedTime();

      currentBendInfluence += (targetBendInfluence - currentBendInfluence) * 0.1;
      uniforms.bendInfluence.value = currentBendInfluence;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (ro) {
        ro.disconnect();
      }

      if (interactive) {
        renderer.domElement.removeEventListener('pointermove', handlePointerMove);
        renderer.domElement.removeEventListener('pointerleave', handlePointerLeave);
      }

      if (parallax) {
        window.removeEventListener('scroll', handleScroll);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [
    enabledWaves,
    lineCount,
    lineDistance,
    bendRadius,
    bendStrength,
    interactive,
    parallax,
    parallaxStrength,
    linesGradient,
    topWavePosition,
    middleWavePosition,
    bottomWavePosition
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        pointerEvents: interactive ? 'auto' : 'none'
      }}
    />
  );
}

export default FloatingLines;
