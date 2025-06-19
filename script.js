const jobs = [];

function addJob() {
  const jobId = document.getElementById('jobId').value;
  const deadline = parseInt(document.getElementById('deadline').value);
  const profit = parseInt(document.getElementById('profit').value);
  const priority = parseInt(document.getElementById('priority').value);
  const executionTime = parseInt(document.getElementById('executionTime').value);

  if (!jobId || isNaN(deadline) || isNaN(profit) || isNaN(priority) || isNaN(executionTime)) return;

  jobs.push({ jobId, deadline, profit, priority, executionTime });
  document.getElementById('jobList').innerHTML += `<li>ID: ${jobId}, Deadline: ${deadline}, Profit: ₹${profit}, Priority: ${priority}</li>`;

  document.getElementById('jobId').value = "";
  document.getElementById('deadline').value = "";
  document.getElementById('profit').value = "";
  document.getElementById('priority').value = "";
}

function runGreedySchedule() {
  const sorted = [...jobs].sort((a, b) => b.priority - a.priority || b.profit - a.profit);
  const maxDeadline = Math.max(...sorted.map(j => j.deadline));
  const slots = Array(maxDeadline).fill(null);
  let total = 0;

  for (let job of sorted) {
    for (let t = Math.min(job.deadline, maxDeadline) - 1; t >= 0; t--) {
      if (!slots[t]) {
        slots[t] = job;
        total += job.profit;
        break;
      }
    }
  }

  document.getElementById('scheduledJobs').innerHTML = '';
  slots.forEach((job, i) => {
    if (job) {
      document.getElementById('scheduledJobs').innerHTML += `<li>Slot ${i + 1}: ${job.jobId} (Priority: ${job.priority}, Profit: ₹${job.profit})</li>`;
    }
  });
  document.getElementById('totalProfit').innerText = `Total Profit: ₹${total}`;
}
function assignJobsToWorkers() {
  const numWorkers = parseInt(document.getElementById('workerCount').value);
  if (isNaN(numWorkers) || numWorkers < 1) return;

  const sorted = [...jobs].sort((a, b) => 
    b.priority - a.priority || a.executionTime - b.executionTime
  );

  // Initialize worker queues
  const workers = Array.from({ length: numWorkers }, () => ({
    jobs: [],
    totalTime: 0
  }));

  for (const job of sorted) {
    // Assign to the worker who is free earliest (least totalTime)
    let earliestWorker = workers.reduce((minWorker, w, i) =>
      w.totalTime < workers[minWorker].totalTime ? i : minWorker, 0
    );
    workers[earliestWorker].jobs.push(job);
    workers[earliestWorker].totalTime += job.executionTime;
  }

  // Display assignments
  const display = document.getElementById('workerAssignments');
  display.innerHTML = '';
  workers.forEach((w, i) => {
    const jobList = w.jobs.map(j => `${j.jobId} (P:${j.priority}, T:${j.executionTime})`).join(', ');
    display.innerHTML += `<p><strong>Worker ${i + 1}:</strong> ${jobList}</p>`;
  });
}
