import { back2top, loadTooptip, modeWatcher } from '../components';
import { external_link } from '../components/external_link';

export function basic() {
  modeWatcher();
  back2top();
  loadTooptip();
  external_link();
}
