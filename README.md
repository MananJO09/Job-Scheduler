# 🗂️ Job Scheduler using Greedy Algorithm

A simple and efficient job scheduling system that uses the **Greedy Algorithm** to maximize profit by selecting the most profitable jobs within their deadlines.

---

## 📌 Problem Statement

Given `n` jobs, each with a deadline and a profit, schedule the jobs such that:

- Only one job can be scheduled at a time
- A job is completed within its deadline
- The total profit is **maximized**

---

## ⚙️ Approach

- Sort jobs by **descending profit**
- Use a **greedy strategy** to assign each job to the latest available slot before its deadline

---

## 💻 Input Format

Each job contains:
- Job ID
- Deadline
- Profit

```text
Example:
Jobs = [("A", 2, 100), ("B", 1, 19), ("C", 2, 27)]
