'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { cn } from '@/utils/tailwind'

// Ashima simplex noise — used to morph the core sphere
const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const VERTEX = `
uniform float uTime;
uniform float uIntensity;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${NOISE}
void main(){
  float n = snoise(position * 1.2 + vec3(uTime * 0.35));
  vNoise = n;
  vec3 displaced = position + normal * n * uIntensity;
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`

const FRAGMENT = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
// cosine palette: amber -> magenta -> cyan
vec3 palette(float t){
  vec3 a=vec3(0.55,0.4,0.55);vec3 b=vec3(0.45,0.4,0.45);vec3 c=vec3(1.0,1.0,1.0);vec3 d=vec3(0.0,0.25,0.55);
  return a+b*cos(6.28318*(c*t+d));
}
void main(){
  float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.5);
  vec3 col = palette(vNoise * 0.45 + fresnel * 0.6 + uTime * 0.05);
  col = mix(col * 0.3, col * 1.1, min(0.35 + fresnel, 1.0));
  col += vec3(1.0, 0.55, 0.85) * pow(fresnel, 5.0) * 0.45;
  col = min(col, vec3(0.95));
  gl_FragColor = vec4(col, 1.0);
}
`

type Props = {
  className?: string
}

const Scene3D = ({ className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmall = window.innerWidth < 768

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)

    camera.position.set(0, 0, 7)

    const group = new THREE.Group()

    group.position.x = isSmall ? 0 : 2.6
    scene.add(group)

    // Morphing iridescent core
    const coreMaterial = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms: { uTime: { value: 0 }, uIntensity: { value: 0.28 } },
    })
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, isSmall ? 48 : 96), coreMaterial)

    group.add(core)

    // Wireframe shell
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.8, 1),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, wireframe: true, transparent: true, opacity: 0.18 })
    )

    group.add(shell)

    // Orbit rings
    const ringColors = [0x22d3ee, 0xe879f9, 0xf59e0b]
    const rings = ringColors.map((color, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.5 + index * 0.35, 0.008, 8, 200),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending })
      )

      ring.rotation.set(Math.PI / 2.3 + index * 0.35, index * 0.6, 0)
      group.add(ring)

      return ring
    })

    // Satellites riding on the rings
    const satellites = ringColors.map((color, index) => {
      const sat = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshBasicMaterial({ color }))

      rings[index].add(sat)

      return sat
    })

    // Star field
    const starCount = isSmall ? 900 : 2200
    const positions = new Float32Array(starCount * 3)
    const colors = new Float32Array(starCount * 3)
    const palette = [new THREE.Color(0x22d3ee), new THREE.Color(0xe879f9), new THREE.Color(0xfbbf24), new THREE.Color(0xffffff)]

    for (let i = 0; i < starCount; i++) {
      const radius = 6 + Math.random() * 22
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi) - 8

      const color = palette[Math.floor(Math.random() * palette.length)]

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const starGeometry = new THREE.BufferGeometry()

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )

    scene.add(stars)

    const mouse = { x: 0, y: 0 }
    const onPointerMove = (event: PointerEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    const onResize = () => {
      const { clientWidth, clientHeight } = container

      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
      group.position.x = window.innerWidth < 768 ? 0 : 2.6
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', onResize)

    let isVisible = true
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })

    observer.observe(container)

    const clock = new THREE.Clock()
    let frameId = 0

    const render = () => {
      const time = clock.getElapsedTime()
      const scroll = Math.min(window.scrollY / window.innerHeight, 1.5)

      coreMaterial.uniforms.uTime.value = time
      coreMaterial.uniforms.uIntensity.value = 0.28 + Math.sin(time * 0.8) * 0.05 + scroll * 0.2

      core.rotation.y = time * 0.15
      core.rotation.x = time * 0.08
      shell.rotation.y = -time * 0.1
      shell.rotation.z = time * 0.05

      rings.forEach((ring, index) => {
        ring.rotation.z = time * (0.15 + index * 0.08) * (index % 2 ? -1 : 1)
        const angle = time * (0.6 + index * 0.2)

        satellites[index].position.set(Math.cos(angle) * (2.5 + index * 0.35), Math.sin(angle) * (2.5 + index * 0.35), 0)
      })

      stars.rotation.y = time * 0.01
      stars.rotation.x = mouse.y * 0.05

      // Cinematic dolly: follow the pointer, push in while scrolling
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04
      camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04
      camera.position.z = 7 + scroll * 2.5
      camera.lookAt(group.position.x * 0.5, 0, 0)

      group.rotation.y = scroll * 0.8

      renderer.render(scene, camera)
    }

    const loop = () => {
      frameId = requestAnimationFrame(loop)
      if (isVisible && !document.hidden) render()
    }

    if (reduceMotion) {
      render()
    } else {
      loop()
    }

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose()
          ;(object.material as THREE.Material).dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={containerRef} aria-hidden className={cn('absolute inset-0', className)} />
}

export default Scene3D
