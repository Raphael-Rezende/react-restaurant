import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import styles from './CardFade.module.css';


function CardFade({ open, children }) {

  return (
    <>
      <div style={{ padding: '10px', position:'fixed', marginTop:'80px', display: 'block' }} >
        <Collapse in={open} dimension="width">
          <div id="example-collapse-text" className={styles.div}>
            <Card body className={styles.cardBody}>
              {children}
            </Card>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default CardFade;