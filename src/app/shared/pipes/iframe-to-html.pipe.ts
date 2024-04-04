import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'iframeToHtml' })
export class IframeToHtml implements PipeTransform {
    public constructor(
        private readonly sanitizer: DomSanitizer,
    ) {}
    public transform(value: string, ...args: any[]): SafeHtml {
        const styles = '<style>iframe {display:flex;align-items:center;justify-content:center;flex-direction:column;margin: 1.5rem 0 1.5rem 0;width:80%;height: 24rem;}iframe.video-placeholder{display:flex;justify-content:center;margin: 2rem 0 2rem 0;width:100%;}iframe.video-placeholder img{width:100px;cursor:pointer;}iframe.video-settings{display:flex;align-items:center;justify-content:center;cursor:pointer;}@media screen and (max-width:1430px){iframe{height:22rem;}}@media screen and (max-width:1200px){iframe{height:18rem;}}@media screen and (max-width:1060px){iframe{height:16rem;}}@media screen and (max-width:927px){iframe{height:15rem;}}@media screen and (max-width:903px){iframe{height:12rem;}}@media screen and (max-width:525px){iframe{height:12rem;}}@media screen and (max-width:500px){iframe{height:10rem;}}@media screen and (max-width:258px){iframe{height:8rem;}}</style>';
        const [link, videoId] = value.split('=');
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
        iframe.setAttribute('title', 'Youtube video player');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        const html = this.sanitizer.bypassSecurityTrustHtml(styles+iframe.outerHTML);
        return html;
    }
}
