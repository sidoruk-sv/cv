import {
  buildContactEntries,
  formatDateRange,
  getContactOrder,
  sortContactEntries,
} from './format.js';

function JobHeader({ job }) {
  const company = job.url ? (
    <a className="company-link" href={job.url}>
      {job.name}
    </a>
  ) : (
    job.name
  );

  return (
    <p className="ats-job-header resume-item-title">
      <span className="company">{company}</span>
      <span className="sep"> | </span>
      <span className="position">{job.position}</span>
      <span className="sep"> | </span>
      <span className="dates">{formatDateRange(job.startDate, job.endDate)}</span>
    </p>
  );
}

function WorkEntry({ job }) {
  const hasHighlights = Array.isArray(job.highlights) && job.highlights.length > 0;

  return (
    <div className="ats-entry resume-item">
      <JobHeader job={job} />
      {job.summary ? (
        <p className="ats-summary resume-description">{job.summary}</p>
      ) : null}
      {hasHighlights ? (
        <ul className="ats-bullets resume-highlights">
          {job.highlights.map((highlight) => (
            <li key={highlight}>- {highlight}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function EducationEntry({ education }) {
  const degree = [education.studyType, education.area].filter(Boolean).join(' in ');
  const dates = formatDateRange(education.startDate, education.endDate);

  return (
    <div className="ats-entry resume-item">
      <p className="ats-edu-header resume-item-title">
        <span className="degree">{degree}</span>
        <span className="sep"> | </span>
        <span className="institution">{education.institution}</span>
        <span className="sep"> | </span>
        <span className="dates">{dates}</span>
      </p>
    </div>
  );
}

function SkillsBlock({ skills }) {
  return (
    <>
      {skills.map((group) => {
        const keywords = group.keywords || [];

        return (
          <div className="ats-skill-line skill-group" key={group.name}>
            {group.name ? (
              <strong className="skill-group-name">{group.name}:</strong>
            ) : null}
            <span className="resume-badge-list skill-keywords">
              {keywords.map((keyword) => (
                <span className="resume-badge" key={keyword}>
                  {keyword}
                </span>
              ))}
            </span>
          </div>
        );
      })}
    </>
  );
}

function LanguagesBlock({ languages }) {
  if (languages.length === 0) {
    return null;
  }

  return (
    <p className="ats-skill-line skill-group">
      <span className="skill-keywords">
        {languages.map((entry) => `${entry.language} (${entry.fluency})`).join(' · ')}
      </span>
    </p>
  );
}

function InterestsBlock({ interests }) {
  return (
    <>
      {interests.map((interest) => (
        <p className="ats-skill-line skill-group" key={interest.name}>
          <strong className="skill-group-name">{interest.name}:</strong>
          <span className="skill-keywords">
            {(interest.keywords || []).join(' · ')}
          </span>
        </p>
      ))}
    </>
  );
}

function ProjectEntry({ project }) {
  const keywords = project.keywords || [];

  return (
    <div className="ats-entry resume-item">
      <p className="ats-project-header">{project.name}</p>
      <ul className="ats-bullets resume-highlights">
        <li>- {project.description}</li>
      </ul>
      {keywords.length > 0 ? (
        <p className="ats-skill-line skill-group project-keywords">
          <strong className="skill-group-name">Technologies:</strong>
          <span className="skill-keywords">{keywords.join(' · ')}</span>
        </p>
      ) : null}
    </div>
  );
}

function ContactLine({ items }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <p className="contact-line">
      {items.map((item, index) => (
        <span className="contact-item" key={item.key}>
          {index > 0 ? <span className="contact-sep">|</span> : null}
          {item.node}
        </span>
      ))}
    </p>
  );
}

function Header({ basics, contactOrder }) {
  const contactItems = sortContactEntries(
    buildContactEntries(basics, { compact: true }),
    contactOrder,
  ).map((entry) => ({
    key: entry.id,
    node:
      entry.kind === 'link' ? (
        <a href={entry.href}>{entry.text}</a>
      ) : (
        <span>{entry.text}</span>
      ),
  }));

  return (
    <header>
      <h1>{basics.name}</h1>
      {basics.label ? <p className="label">{basics.label}</p> : null}
      <ContactLine items={contactItems} />
      {basics.summary ? (
        <p className="summary-block resume-summary">{basics.summary}</p>
      ) : null}
    </header>
  );
}

function Resume({ resume }) {
  const {
    basics = {},
    work = [],
    education = [],
    skills = [],
    projects = [],
    languages = [],
    interests = [],
  } = resume;

  return (
    <main>
      {basics?.name ? (
        <Header basics={basics} contactOrder={getContactOrder(resume)} />
      ) : null}

      {work.length > 0 ? (
        <section id="work" className="resume-section">
          <h2 className="resume-section-title">Work Experience</h2>
          {work.map((job) => (
            <WorkEntry job={job} key={`${job.name}-${job.startDate}`} />
          ))}
        </section>
      ) : null}

      {skills.length > 0 ? (
        <section id="skills" className="resume-section">
          <h2 className="resume-section-title">Skills</h2>
          <SkillsBlock skills={skills} />
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section id="projects" className="resume-section">
          <h2 className="resume-section-title">Projects</h2>
          {projects.map((project) => (
            <ProjectEntry project={project} key={project.name} />
          ))}
        </section>
      ) : null}

      {education.length > 0 ? (
        <section id="education" className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          {education.map((entry) => (
            <EducationEntry education={entry} key={entry.institution} />
          ))}
        </section>
      ) : null}

      {languages.length > 0 ? (
        <section id="languages" className="resume-section">
          <h2 className="resume-section-title">Languages</h2>
          <LanguagesBlock languages={languages} />
        </section>
      ) : null}

      {interests.length > 0 ? (
        <section id="interests" className="resume-section">
          <h2 className="resume-section-title">Interests</h2>
          <InterestsBlock interests={interests} />
        </section>
      ) : null}
    </main>
  );
}

export default Resume;
