import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ScrambledText } from 'scrambled-text';
import { VscGithubAlt } from 'react-icons/vsc';
import { RiLinkedinLine } from 'react-icons/ri';
import { BsMouse } from 'react-icons/bs';

interface VisibleComponents {
  title: boolean;
  mouse: boolean;
  credits: boolean;
}

const UserInterface: React.FC = () => {
  const [visibleComponents, setVisibleComponents] = useState<VisibleComponents>({
    title: false,
    mouse: false,
    credits: false,
  });

  useEffect(() => {
    setVisibleComponents((prev) => {
      return {
        ...prev,
        title: true,
      };
    });
    setTimeout(() => {
      setVisibleComponents((prev) => {
        return {
          ...prev,
          mouse: true,
        };
      });
    }, 2200);
  }, []);

  return (
    <div className={styles.ui}>
      <h1 className={visibleComponents.title ? styles.title : styles.invisible}>
        <ScrambledText text="Welcome, traveller." interval={85} duration={12000} />
      </h1>

      <footer className={visibleComponents.mouse ? styles.footer : styles.invisible}>
        <span className={styles.mouse}>
          <BsMouse color="white" size={'2rem'} />{' '}
          <ScrambledText
            text="Hold left click to move, right click to pan"
            running={visibleComponents.mouse}
            interval={85}
            duration={12000}
          />
        </span>
        <span className={styles.credits}>
          Made on 🌎 by a <a href="https://github.com/douugbr">human</a>
        </span>
      </footer>
    </div>
  );
};

export default UserInterface;
