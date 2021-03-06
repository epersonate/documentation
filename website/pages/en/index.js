/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = props => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/undraw_responsivness.svg`} />
        <div className="inner">
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
          <PromoSection>
            <Button href="https://epersonate.com">Login</Button>
            <Button href={docUrl('installation.html')}>Getting Started</Button>
            <Button href={docUrl('live-demo.html')}>Live Demo</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content:
              'Install Epersonate in under 15 minutes' +
              'Generate the impersonation system of your application using our open-source agents and start fixing your product without invading your customer\'s privacy.', 
            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: 'left',
            title: 'Wonderful SVG Illustrations',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <div style={{backgroundColor:'#2f4566', color:'white'}}>
        <Block>
          {[
            {
              content:
                'Works with popular stacks. Epersonate is compatible with all kinds of application frameworks and software architectures.',
              image: `${baseUrl}img/undraw_dev_focus.svg`,
              imageAlign: 'right',
              title: 'Get started in less than 15 minutes'
            },
          ]}
        </Block>
      </div>
      
    );

    const LearnHow = () => (
      <div style={{backgroundColor:'#193055', color:'white'}}>
        <Block>
          {[
            {
              content:
                'See how Epersonate could positively impact your product with our [live demo](/documentations/live-demo.html).',
              image: `${baseUrl}images/demo.gif`,
              imageAlign: 'left',
              title: 'Live Demonstration',
            },
          ]}
        </Block>
      </div>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'Let your admin knows they are currently impersonating customers to reduce potentially devastating mistakes with permanent warnings reminders.',
            image: `${baseUrl}img/undraw_warning.svg`,
            imageAlign: 'top',
            title: 'Warnings',
          },
          {
            content: 'Redaction of Personal Identifiable Information (SOC2 Compliant)',
            image: `${baseUrl}img/undraw_privacy.svg`,
            imageAlign: 'top',
            title: 'PII Redaction',
          },
          {
            content: 'Impersonation Logging Dashboard (SOC2 Compliant)',
            image: `${baseUrl}img/undraw_dark_analytics.svg`,
            imageAlign: 'top',
            title: 'Logging',
          }
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection ">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div>
          <Description />
          <Features />
          <LearnHow />
        </div>
      </div>
    );
  }
}

module.exports = Index;
