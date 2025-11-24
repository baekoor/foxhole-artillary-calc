/**
 * Test script to find Foxhole process
 * Run this WHILE Foxhole is running to see the exact process name
 */

const { default: psList } = require('ps-list');

(async () => {
  console.log('🔍 Searching for Foxhole...\n');

  const processes = await psList();
  console.log(`Scanning ${processes.length} processes...\n`);

  // Search for anything that might be Foxhole
  const candidates = processes.filter(p => {
    const name = p.name.toLowerCase();
    return (
      name.includes('foxhole') ||
      name.includes('fox') ||
      name.includes('hole') ||
      name === 'foxhole.exe' ||
      name.startsWith('foxhole')
    );
  });

  if (candidates.length > 0) {
    console.log('✅ Found potential Foxhole process(es):\n');
    candidates.forEach(p => {
      console.log(`Process Name: "${p.name}"`);
      console.log(`PID: ${p.pid}`);
      console.log(`Memory: ${(p.memory / 1024 / 1024).toFixed(1)} MB`);
      console.log('---');
    });
  } else {
    console.log('❌ No Foxhole-related processes found.\n');
    console.log('Please make sure:');
    console.log('1. Foxhole is launched from Steam');
    console.log('2. You are in the game (not just launcher)');
    console.log('3. The game window is open\n');
    console.log('Then run this script again.');
  }

  console.log('\n💡 Tip: Run "node find-foxhole.js" while in-game to see the exact process name.');
})();
