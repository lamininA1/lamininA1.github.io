import { back2top } from '../components/back-to-top';
import { loadTooptip } from '../components/tooltip-loader';
import { external_link } from '../components/external_link'; // 해당 줄 추가

export function basic() {
  back2top();
  loadTooptip();
  external_link(); // 해당 줄 추가
}
