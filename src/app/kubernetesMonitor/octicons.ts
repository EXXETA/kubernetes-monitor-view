/*
 * kubernetes-monitor-view
 * Copyright (C) 2018 Thomas Pohl and EXXETA AG
 * http://www.exxeta.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Directive, Input, OnInit, ElementRef, Renderer2, OnChanges } from '@angular/core';

import * as octicons from 'octicons';

@Directive({
    selector: '[appOcticon]'
})
export class OcticonDirective implements OnInit, OnChanges {

    @Input() appOcticon: string;
    @Input() color: string;
    @Input() width: number;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.ngOnChanges();
    }
    ngOnChanges(): void {
        const el: HTMLElement = this.elementRef.nativeElement;
        el.innerHTML = octicons[this.appOcticon].toSVG();

        const icon: Node = el.firstChild;
        if (this.color) {
            this.renderer.setStyle(icon, 'color', this.color)
        }
        if (this.width) {
            this.renderer.setStyle(icon, 'width', this.width);
            this.renderer.setStyle(icon, 'height', '100%');
        }
    }

}
