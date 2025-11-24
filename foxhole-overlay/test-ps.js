const { default: psList } = require('ps-list');

(async () => {
  console.log('Scanning for Foxhole process...\n');

  const processes = await psList();
  console.log(`Total processes: ${processes.length}\n`);

  // Look for Foxhole (case-insensitive, includes partial matches)
  const foxhole = processes.filter(p =>
    p.name.toLowerCase().includes('foxhole')
  );

  if (foxhole.length > 0) {
    console.log('[OK] FOUND Foxhole processes:');
    foxhole.forEach(p => {
      console.log(`  - Name: "${p.name}"`);
      console.log(`    PID: ${p.pid}`);
      console.log('');
    });
    console.log('The overlay should detect this and enable F10 hotkey!');
  } else {
    console.log('[ERROR] No Foxhole processes found.');
    console.log('\nMake sure Foxhole is running from Steam.');
  }
})();
