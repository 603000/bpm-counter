import React, { useState } from 'react';
import { SeverityLevel } from '@microsoft/applicationinsights-web';

function About(props) {
  const [clientPrincipal, setClientPrincipal] = useState(null);

  let appInsights = props.appInsights;

  function trackException() {
    appInsights.trackException({
      error: new Error('some error'),
      severityLevel: SeverityLevel.Error,
    });
  }

  function trackTrace() {
    appInsights.trackTrace({
      message: 'some trace',
      severityLevel: SeverityLevel.Information,
    });
  }

  function trackEvent() {
    appInsights.trackEvent({ name: 'some event' });
  }

  function throwError() {
    let foo = {
      field: { bar: 'value' },
    };

    // This will crash the app; the error will show up in the Azure Portal
    return foo.fielld.bar;
  }

  function ajaxRequest() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://httpbin.org/status/200');
    xhr.send();
  }

  function fetchRequest() {
    fetch('https://httpbin.org/status/200');
  }

  async function fetchClientPrincipal() {
    try {
      const res = await fetch('/.auth/me');
      const json = await res.json();
      if (json.clientPrincipal) {
        setClientPrincipal(json.clientPrincipal);
      }
    } catch (e) {
      if (window.location.hostname === 'localhost') {
        console.warn(
          "Can't access the auth endpoint. For local development, please use the Static Web Apps CLI to emulate authentication: https://github.com/azure/static-web-apps-cli"
        );
      } else {
        console.error(`Failed to unpack JSON.`, e);
      }
    }
  }

  return (
    <main className="content">
      
      <h3>Author and credits</h3>
      <p>
        Built by <a href="https://twitter.com/webmaxru">Maxim Salnikov</a>. I
        will be happy to see your feedback and contributions in{' '}
        <a href="https://github.com/webmaxru/bpm-counter/issues/">
          the project GitHub repo
        </a>
        .
      </p>
     
    
    </main>
  );
}

export default About;
