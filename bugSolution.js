/* bug.js */
import * as Constants from 'expo-constants';

const getDeviceId = async () => {
  const deviceId = await Constants.deviceId;
  console.log('Device ID:', deviceId); //Logs null intermittently
};

getDeviceId();

/* bugSolution.js */
import * as Constants from 'expo-constants';

const getDeviceIdWithRetry = async (maxRetries = 3, retryDelay = 1000) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const deviceId = await Constants.deviceId;
      if (deviceId) {
        return deviceId;
      } else {
        console.log(`Device ID retrieval failed. Retrying in ${retryDelay}ms...`);
      }
    } catch (error) {
      console.error('Error retrieving device ID:', error);
    }
    await new Promise(resolve => setTimeout(resolve, retryDelay));
    retryDelay *= 2; // Exponential backoff
    retries++;
  }
  console.warn('Failed to retrieve device ID after multiple retries. Using fallback...');
  return 'fallback-device-id'; // Or implement another fallback strategy
};

getDeviceIdWithRetry();