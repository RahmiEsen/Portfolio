import { Component, ElementRef, AfterViewInit } from '@angular/core';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  Sprite,
  SpriteMaterial,
  Texture
} from 'three';

@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.scss'],
})

export class TechStackComponent implements AfterViewInit {
  scene!: Scene;
  camera!: PerspectiveCamera;
  renderer!: WebGLRenderer;
  icons: Sprite[] = [];
  mouseX = 0;
  mouseY = 0;
  targetRotationX = .02;
  targetRotationY = -.02;
  
  constructor(private elRef: ElementRef) {}
  
  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
    if (window.innerWidth > 1024) {
      this.initCursorGlow();
      this.attachEvents();
    }
  }
  
  private initCursorGlow(): void {
    const glow = this.elRef.nativeElement.querySelector('#cursor-glow');
    const area = this.elRef.nativeElement.querySelector('.tech-stack-area');
    if (!glow || !area) return;
    
    document.addEventListener('mousemove', (event: MouseEvent) =>
      this.updateGlow(event, glow, area)
    );
  }
  
  private updateGlow(event: MouseEvent, glow: HTMLElement, area: HTMLElement): void {
    const isInside = area.contains(event.target as Node);
    glow.style.display = isInside ? 'block' : 'none';
    if (isInside) {
      const rect = area.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      glow.style.top = `${y}px`;
      glow.style.left = `${x}px`;
    }
  }  
  
  private attachEvents(): void {
    const canvas = document.getElementById('iconCloudCanvas') as HTMLCanvasElement;
    if (!canvas) return;
  
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
  }
  
  private attachMouseMove(): void {
    const canvas = document.getElementById('iconCloudCanvas') as HTMLCanvasElement;
    if (canvas) {
      canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }
  
  private initScene(): void {
    const canvas = document.getElementById('iconCloudCanvas') as HTMLCanvasElement;
    this.scene = new Scene();
    this.setupCamera(canvas);
    this.setupRenderer(canvas);
    this.loadIcons();
  }
  
  private setupCamera(canvas: HTMLCanvasElement): void {
    this.camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.camera.position.z = 350;
  }
  
  private setupRenderer(canvas: HTMLCanvasElement): void {
    this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(canvas.clientWidth * window.devicePixelRatio, canvas.clientHeight * window.devicePixelRatio, false);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }
  
  private loadIcons(): void {
    const iconPaths = [
      './assets/stack/html.svg',
      './assets/stack/css.svg',
      './assets/stack/scss.svg',
      './assets/stack/tailwind.svg',
      './assets/stack/js.svg',
      './assets/stack/angular.svg',
      './assets/stack/ts.svg',
      './assets/stack/fb.svg',
      './assets/stack/three.svg',
    ];
    
    const radius = 175;
    const loader = new TextureLoader();
    iconPaths.forEach((path, index) => this.createIcon(path, index, iconPaths.length, radius, loader));
  }
  
  private createIcon(path: string, index: number, total: number, radius: number, loader: TextureLoader): void {
    loader.load(path, (texture) => {
      texture.colorSpace = 'srgb';
      const sprite = this.createSprite(texture);
      this.positionSprite(sprite, index, total, radius);
      this.scene.add(sprite);
      this.icons.push(sprite);
    });
  }
  
  private createSprite(texture: Texture): Sprite {
    const material = new SpriteMaterial({ map: texture });
    const sprite = new Sprite(material);
    sprite.scale.set(75, 75, 3);
    return sprite;
  }
  
  private positionSprite(sprite: Sprite, index: number, total: number, radius: number): void {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    sprite.position.set(
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    );
  }
  
  private onMouseMove(event: MouseEvent): void {
    const canvas = document.getElementById('iconCloudCanvas') as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const { clientX, clientY } = event;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      this.updateMouse(x, y, rect.width, rect.height);
    }
  }
  
  private onTouchMove(event: TouchEvent): void {
    if (!event.touches.length) return;
    
    const canvas = document.getElementById('iconCloudCanvas') as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      this.updateMouse(x, y, rect.width, rect.height);
    }
  }
  
  private updateMouse(x: number, y: number, width: number, height: number): void {
    this.mouseX = (x / width) * 2 - 1;
    this.mouseY = -(y / height) * 2 + 1;
    this.targetRotationY = this.mouseX * 0.05;
    this.targetRotationX = this.mouseY * 0.05;
  }
  
  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.rotateIcons();
    this.renderer.render(this.scene, this.camera);
  }
  
  private rotateIcons(): void {
    this.icons.forEach((icon) => this.rotateIcon(icon));
  }
  
  private rotateIcon(icon: Sprite): void {
    const { x, y, z } = icon.position;
    const { targetRotationX: angleX, targetRotationY: angleY } = this;
    
    let newY = y * Math.cos(angleX) - z * Math.sin(angleX);
    let newZ = y * Math.sin(angleX) + z * Math.cos(angleX);
    
    let newX = x * Math.cos(angleY) - newZ * Math.sin(angleY);
    newZ = x * Math.sin(angleY) + newZ * Math.cos(angleY);
    
    icon.position.set(newX, newY, newZ);
  }
}