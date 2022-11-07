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
      
    
            <h3>Service links for Azure Static Web Apps demo</h3>
      <p>
        <a href="https://github.com/webmaxru/bpm-counter/">
          GitHub repo with a step-by-step demo guide
        </a>
      </p>
      <ul>
        <li>
          <b>Authentication</b> |&nbsp;
          <a href="https://docs.microsoft.com/en-us/azure/static-web-apps/authentication-authorization?ocid=aid3040965">
            Documentation
          </a>
          <pre>/login</pre>
          <a href="/login">Common login page</a>
          <br />
          <br />
          <pre>/.auth/login/twitter</pre>
          <a href=".auth/login/twitter">Log in with Twitter</a>
          <br />
          <br />
          <pre>/.auth/login/github</pre>
          <a href=".auth/login/github">Log in with GitHub</a>
          <br />
          <br />
          <pre>/.auth/me</pre>
          <button className="button" onClick={fetchClientPrincipal}>
            Fetch user account data
          </button>
          {clientPrincipal ? (
            <ul>
              <li>identityProvider: {clientPrincipal.identityProvider}</li>
              <li>userId: {clientPrincipal.userId}</li>
              <li>userDetails: {clientPrincipal.userDetails}</li>
              <li>userRoles: {clientPrincipal.userRoles.join(', ')}</li>
            </ul>
          ) : (
            <p>Not logged in</p>
          )}
          <br />
          <pre>/.auth/logout</pre>
          <a href=".auth/logout">Log out</a>
          <br />
          <br />
          <pre>/.auth/purge/twitter</pre>
          <a href=".auth/purge/twitter">
            Remove personal information for Twitter as a provider
          </a>
          <br />
          <br />
          <pre>/.auth/purge/github</pre>
          <a href=".auth/purge/github">
            Remove personal information for GitHub as a provider
          </a>
          <br />
          <br />
          <button onClick={trackException}>Track Exception</button>
          <button onClick={trackEvent}>Track Event</button>
          <button onClick={trackTrace}>Track Trace</button>
          <button onClick={throwError}>Autocollect an Error</button>
          <button onClick={ajaxRequest}>
            Autocollect a Dependency (XMLHttpRequest)
          </button>
          <button onClick={fetchRequest}>
            Autocollect a dependency (Fetch)
          </button>
          <br />
          <br />
        </li>
        <li>
          <b>Routes</b> |&nbsp;
          <a href="https://docs.microsoft.com/en-us/azure/static-web-apps/routes?ocid=aid3040965">
            Documentation
          </a>
          <p>
            Use staticwebapp.config.json (
            <a href="https://github.com/webmaxru/bpm-counter/blob/main/src/staticwebapp.config.json">
              sample
            </a>
            ) in the app route
          </p>
          <pre>/login</pre>
          <a href="/login">Log in</a>
          <br />
          <br />
          <pre>/logout</pre>
          <a href="/logout">Log out</a>
          <br />
          <br />
          <pre>/account</pre>
          <a href="/account">Account - for "authenticated" only</a>
          <br />
          <br />
          <pre>/admin</pre>
          <a href="/admin">Admin - for "administrator" only</a>
          <br />
          <br />
          <pre>/aboutme</pre>
          <a href="/aboutme">Redirect 301</a>
          <br />
          <br />
        </li>
      </ul>
      
    
    </main>
  );
}

export default About;
