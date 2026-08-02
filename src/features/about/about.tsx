import { articleBody } from '@/features/article/article.css';
import { serifHeading } from '@/shared/ui/heading.css';
import { Kicker } from '@/shared/ui';
import { cx } from '@/styles/cx';
import * as css from '@/features/about/about.css';

const WORKS = [
  {
    name: 'Assistfit',
    role: 'Frontend Engineer · 2025.06 —',
    desc: 'Leading the frontend team, developing and maintaining fitness CRM features',
    stack: 'React · Next.js · TypeScript · Tailwind CSS · AWS',
  },
  {
    name: 'Swit Korea',
    role: 'Frontend Engineer · 2021.01 — 2024.06',
    desc: 'Global collaboration tool based on project management and chat service',
    stack: 'Angular · Github · Typescript',
  },
  {
    name: 'Wins',
    role: 'Web Fullstack Engineer · 2019.04 — 2020.12',
    desc: 'Security solution web service',
    stack: 'Angular · Gitlab · Node.js(express) · Typescript',
  },
  {
    name: 'ESE',
    role: 'Web Fullstack Engineer · 2016.10 — 2019.03',
    desc: 'Control system based on video management service',
    stack: 'Java · Javascript · Spring · jQuery',
  },
];

export function AboutPage() {
  return (
    <>
      <div className={css.head}>
        <div className={css.intro}>
          <Kicker>About</Kicker>
          <h1 className={cx(serifHeading, css.introTitle)}>
            Minyoung <em>Seo</em>
          </h1>
          <p className={css.introSub}>I'm a developer who grows by learning new things.</p>
        </div>
      </div>
      <div className={css.content}>
        <div className={articleBody}>
          <h2>Direction</h2>
          <p>
            I love learning, and I happened to discover programming.
            <br />
            Now, I'm enjoying my life as a developer.
          </p>
          <h2>Technologies I Study with Passion</h2>
          <ul>
            <li>
              <b>Rust</b> — A language suitable for large-scale projects with high memory availability and strong type
              system without GC. The ownership system saved me from the fake immutability of JavaScript.
            </li>
            <li>
              <b>Next.js</b> — The framework I had to use for React server-side rendering. Although it is complex and
              has many features, it is the only option for fine-grained rendering control.
            </li>
            <li>
              <b>Tailwind CSS</b> — By using this, I was able to prevent the vision from being dispersed. It helped me
              understand the structure by just looking at the html.
            </li>
            <li>
              <b>Typescript</b> — If there were no Typescript, I would not have been able to develop web services.
            </li>
            <li>
              <b>Kotlin</b> — The language that saved me from null pointer exception errors. The language that
              prevented me from writing countless duplicate code.
            </li>
          </ul>
          <h2>Works</h2>
          <div className={css.workList}>
            {WORKS.map((w) => (
              <div key={w.name} className={css.workItem}>
                <h3>{w.name}</h3>
                <span className={css.workRole}>{w.role}</span>
                <p>{w.desc}</p>
                <div className={css.workStack}>{w.stack}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
