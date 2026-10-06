import * as SI from 'react-icons/si'
import { FaJava, FaAws, FaCss3Alt, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { TbBrandOauth, TbApi, TbHierarchy2, TbInfinity } from 'react-icons/tb'

const A = ({ children }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
)
// AWS service glyphs (AWS has no Simple Icons entries) — swap for official AWS Architecture Icons if desired.
const Ec2 = () => <A><rect x="6" y="6" width="12" height="12" rx="1.5" /><path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" /></A>
const S3 = () => <A><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6l2 13c.3 1.2 3 2 6 2s5.700-.8 6-2l2-13" /></A>
const Rds = () => <A><ellipse cx="12" cy="5.500" rx="7" ry="2.500" /><path d="M5 5.500v13c0 1.400 3.100 2.500 7 2.500s7-1.100 7-2.500v-13M5 12c0 1.400 3.100 2.500 7 2.500s7-1.100 7-2.500" /></A>
const Lambda = () => <A><path d="M5 20h4l3-7M8 4h3l8 16" /></A>
const Cf = () => <A><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></A>
const Gw = () => <A><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.500 5l-3 14" /></A>
const Iam = () => <A><circle cx="9" cy="9" r="3.500" /><path d="M3 20c0-3.300 2.700-6 6-6M14 14h7M18 14v4M21 14v3" /><circle cx="14.500" cy="9" r="0" /></A>
const Cw = () => <A><circle cx="10.500" cy="10.500" r="6.500" /><path d="M15.500 15.500L21 21M7 11l2 2 3-4 2 2" /></A>
const Rest = () => <TbApi />
const Micro = () => <TbHierarchy2 />
const Cicd = () => <TbInfinity />
const Jwt = SI.SiJsonwebtokens

const t = (name, Icon, color, group, desc, rel = []) => ({ name, Icon, color, group, desc, rel })

export const GROUPS = {
  backend: 'Backend', frontend: 'Frontend', database: 'Database', cloud: 'Cloud / AWS', devops: 'DevOps', tools: 'Development tools',
}

export const TECH = {
  java: t('Java', FaJava, '#f89820', 'backend', 'Core backend language for building scalable, type-safe applications.', ['springboot', 'hibernate', 'maven', 'kafka', 'microservices']),
  spring: t('Spring', SI.SiSpring, '#6db33f', 'backend', 'The Java framework family behind dependency injection and enterprise apps.', ['springboot', 'springsecurity', 'java']),
  springboot: t('Spring Boot', SI.SiSpringboot, '#6db33f', 'backend', 'Opinionated Spring setup for production-ready REST services and microservices.', ['java', 'spring', 'hibernate', 'rest', 'microservices', 'kafka', 'docker']),
  springsecurity: t('Spring Security', SI.SiSpringsecurity, '#6db33f', 'backend', 'Authentication and role-based authorization for Spring applications.', ['jwt', 'oauth2', 'springboot']),
  hibernate: t('Hibernate', SI.SiHibernate, '#59666c', 'backend', 'ORM that maps Java objects to relational tables through JPA.', ['java', 'mysql', 'postgres', 'springboot']),
  rest: t('REST API', Rest, '#22d3ee', 'backend', 'Stateless HTTP APIs with clear resources, status codes and validation.', ['springboot', 'axios', 'swagger', 'postman']),
  microservices: t('Microservices', Micro, '#38bdf8', 'backend', 'Independent services with Eureka discovery and an API Gateway.', ['springboot', 'kafka', 'docker', 'k8s', 'apigw']),
  kafka: t('Apache Kafka', SI.SiApachekafka, '#e5e7eb', 'backend', 'Event streaming for decoupled, asynchronous service communication.', ['microservices', 'springboot', 'docker']),
  jwt: t('JWT', Jwt, '#d63aff', 'backend', 'Signed tokens for stateless authentication across services.', ['springsecurity', 'rest']),
  oauth2: t('OAuth2', TbBrandOauth, '#3b82f6', 'backend', 'Delegated authorization standard, including Google sign-in flows.', ['springsecurity', 'jwt']),
  maven: t('Maven', SI.SiApachemaven, '#c71a36', 'backend', 'Build and dependency management for Java projects.', ['java', 'springboot', 'jenkins']),

  react: t('React', SI.SiReact, '#61dafb', 'frontend', 'Component-based UI library for fast, interactive front ends.', ['js', 'vite', 'tailwind', 'axios', 'framer', 'three']),
  js: t('JavaScript', SI.SiJavascript, '#f7df1e', 'frontend', 'The language of the browser — async logic and DOM interaction.', ['react', 'html', 'css']),
  html: t('HTML5', SI.SiHtml5, '#e34f26', 'frontend', 'Semantic, accessible page structure.', ['css', 'js']),
  css: t('CSS3', FaCss3Alt, '#1572b6', 'frontend', 'Layout, theming and animation for responsive interfaces.', ['html', 'tailwind', 'bootstrap']),
  tailwind: t('Tailwind CSS', SI.SiTailwindcss, '#38bdf8', 'frontend', 'Utility-first CSS for consistent, fast styling.', ['css', 'react', 'vite']),
  bootstrap: t('Bootstrap', SI.SiBootstrap, '#7952b3', 'frontend', 'Responsive grid and ready-made components.', ['css', 'html']),
  framer: t('Framer Motion', SI.SiFramer, '#e5e7eb', 'frontend', 'Declarative animation library for React.', ['react']),
  three: t('Three.js', SI.SiThreedotjs, '#e5e7eb', 'frontend', 'WebGL 3D graphics in the browser.', ['js', 'react']),
  vite: t('Vite', SI.SiVite, '#a78bfa', 'frontend', 'Instant dev server and fast production builds.', ['react', 'npm']),
  axios: t('Axios', SI.SiAxios, '#5a29e4', 'frontend', 'HTTP client that connects React to REST backends.', ['react', 'rest']),

  mysql: t('MySQL', SI.SiMysql, '#4479a1', 'database', 'Relational database for transactional application data.', ['hibernate', 'springboot', 'rds']),
  postgres: t('PostgreSQL', SI.SiPostgresql, '#4169e1', 'database', 'Advanced open-source relational database.', ['hibernate', 'springboot']),
  mongo: t('MongoDB', SI.SiMongodb, '#47a248', 'database', 'Document database for flexible schemas.', ['springboot']),
  redis: t('Redis', SI.SiRedis, '#dc382d', 'database', 'In-memory store for caching and fast lookups.', ['springboot', 'microservices']),

  aws: t('Amazon Web Services', FaAws, '#ff9900', 'cloud', 'Cloud platform for hosting, storage, networking and monitoring.', ['ec2', 's3', 'rds', 'lambda', 'cloudfront', 'apigw', 'iam', 'cloudwatch']),
  ec2: t('Amazon EC2', Ec2, '#ff9900', 'cloud', 'Virtual servers that run Spring Boot services and containers.', ['aws', 'docker', 'springboot']),
  s3: t('Amazon S3', S3, '#3fb950', 'cloud', 'Object storage for static builds, uploads and backups.', ['aws', 'cloudfront']),
  rds: t('Amazon RDS', Rds, '#4f8cff', 'cloud', 'Managed relational databases such as MySQL.', ['aws', 'mysql']),
  lambda: t('AWS Lambda', Lambda, '#ff9900', 'cloud', 'Serverless functions triggered by events.', ['aws', 'apigw']),
  cloudfront: t('AWS CloudFront', Cf, '#a78bfa', 'cloud', 'CDN that serves the React build close to users.', ['aws', 's3', 'react']),
  apigw: t('AWS API Gateway', Gw, '#e879f9', 'cloud', 'Managed front door for APIs and routing.', ['aws', 'lambda', 'microservices']),
  iam: t('AWS IAM', Iam, '#ef4444', 'cloud', 'Users, roles and least-privilege permissions.', ['aws', 'ec2']),
  cloudwatch: t('AWS CloudWatch', Cw, '#f472b6', 'cloud', 'Logs, metrics and alarms for running services.', ['aws', 'ec2']),

  docker: t('Docker', SI.SiDocker, '#2496ed', 'devops', 'Containers that package each service with its dependencies.', ['k8s', 'springboot', 'jenkins', 'githubactions']),
  k8s: t('Kubernetes', SI.SiKubernetes, '#326ce5', 'devops', 'Orchestrates and scales containers.', ['docker', 'aws', 'microservices']),
  git: t('Git', SI.SiGit, '#f05032', 'devops', 'Version control with branches and clean history.', ['github']),
  github: t('GitHub', SI.SiGithub, '#e5e7eb', 'devops', 'Code hosting, reviews and collaboration.', ['git', 'githubactions']),
  githubactions: t('GitHub Actions', SI.SiGithubactions, '#2088ff', 'devops', 'Automated build and test workflows.', ['github', 'docker', 'cicd']),
  jenkins: t('Jenkins', SI.SiJenkins, '#d24939', 'devops', 'Automation server for CI/CD pipelines.', ['docker', 'maven', 'cicd']),
  linux: t('Linux', SI.SiLinux, '#fcc624', 'devops', 'The server environment for deployments.', ['docker', 'ec2']),
  cicd: t('CI/CD', Cicd, '#22d3ee', 'devops', 'Continuous integration and delivery from commit to production.', ['githubactions', 'jenkins', 'docker']),

  intellij: t('IntelliJ IDEA', SI.SiIntellijidea, '#fe315d', 'tools', 'Primary IDE for Java and Spring development.', ['java', 'maven']),
  vscode: t('Visual Studio Code', VscVscode, '#2f80ed', 'tools', 'Editor for React and front-end work.', ['react', 'js']),
  postman: t('Postman', SI.SiPostman, '#ff6c37', 'tools', 'Test and document API requests.', ['rest', 'swagger']),
  swagger: t('Swagger / OpenAPI', SI.SiSwagger, '#85ea2d', 'tools', 'Interactive API documentation.', ['rest', 'postman', 'springboot']),
  npm: t('npm', SI.SiNpm, '#cb3837', 'tools', 'Package manager for the JavaScript ecosystem.', ['vite', 'react']),
}

export const LINKS = {
  github: 'https://github.com/bhiseyash77-creator',
  linkedin: 'https://www.linkedin.com/in/yashbhise1',
  email: 'bhiseyash77@gmail.com',
}
export { FaLinkedin, FaGithub, FaEnvelope }
