/**
Copyright 2016 Split Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/
import options from './options';

function RequestFactory(settings, relativeUrl, params) {
  const token = settings.core.authorizationKey;
  const version = settings.version;
  const { ip, hostname } = settings.runtime;
  const headers = {};
  const baseline = options();

  headers['Accept'] = 'application/json';
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = `Bearer ${token}`;
  headers['SplitSDKVersion'] = version;

  // IP and MachineName headers are sent only if the setting IPAddressesEnabled is true, even if the values are 'unknown'.  
  if (settings.core.IPAddressesEnabled) {
    headers['SplitSDKMachineIP'] = ip;
    headers['SplitSDKMachineName'] = hostname;
  }

  return {
    headers,
    url: settings.url(relativeUrl),
    ...baseline,
    ...params
  };
}

export default RequestFactory;
