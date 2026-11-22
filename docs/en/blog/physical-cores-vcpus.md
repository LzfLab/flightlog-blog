---
title: 'Relationship Between Physical Cores and vCPUs'
date: '2025-09-24'
summary: 'How physical CPUs map to or are allocated to vCPUs, and how many vCPUs one physical CPU can virtualize'
tags: ['hardware']
draft: false
authors: ['default']
---

### 1. Number of CPUs

When purchasing a physical server, we can usually see the number of CPUs, for example one or two.

### 2. Physical cores per CPU

Each CPU has multiple physical cores, for example 24 cores or 48 cores.

### 3. PCPU

**PCPU** is short for "**Physical CPU**" and is commonly used in virtualization, cloud computing, and operating systems to refer to processor cores or thread resources that actually exist in hardware. For example, an Intel i7 CPU may have 4 physical cores, each supporting 2 threads (hyper-threading), so you have 4 PCPUs and 8 vCPUs (virtual CPUs).

![img](https://markdownimage-1257263724.cos.ap-chengdu.myqcloud.com/typroa/download.jpeg)

### 4. LCPU

LCPU refers to the logical CPU count, i.e. the multiple cores emulated from one physical core through hyper-threading. **LCPU count = PCPU count x threads per core**.

**Hyper-threading** allows one physical core to handle two threads simultaneously, making the operating system "think" there are two cores. Thus, a quad-core CPU that supports hyper-threading appears to the operating system as 4 PCPUs * 2 = 8 LCPUs.

### 5. vCPU

A logical core, i.e. the CPU resource allocated to a virtual machine in a virtualized environment. It is ultimately executed by the host's PCPU.

### 6. Overcommit ratio

The "**overcommit ratio**" is a term commonly seen in **virtualization** and **cloud computing** scenarios. It usually refers to:

> **The ratio between the number of virtual CPUs (vCPUs) and the number of physical CPUs (pCPUs)**, also called the **CPU overcommit ratio**.

------

### Detailed explanation:

#### Formula:

```
Overcommit ratio = total vCPUs ÷ total pCPUs
```

#### Example:

Suppose you have a server with:

- Physical CPU cores (pCPUs): 8
- Total vCPUs used by virtual machines: 32

Then:

```
Overcommit ratio = 32 vCPUs ÷ 8 pCPUs = 4
```

This means: **each physical core is "oversold" 4 times**, or: **4 vCPUs share 1 pCPU**.

------

### Why overcommit?

In practice, not all virtual machines continuously saturate their CPUs. Many workloads are intermittent (such as web services and database queries). To improve resource utilization, cloud platforms therefore:

- Allocate more vCPUs than the actual physical CPUs
- Let multiple virtual machines share physical cores

This strategy can greatly improve **CPU utilization and system revenue**.

------

### Impact of the overcommit ratio:

| Overcommit ratio          | Characteristics                                | Risk                                      |
| ------------------------- | ---------------------------------------------- | ----------------------------------------- |
| Low (e.g. 1:1 ~ 2:1)      | Good performance, little resource waste        | High cost                                 |
| High (e.g. 4:1 ~ 8:1)     | Low cost, high resource utilization            | Possible performance degradation, CPU contention |

------

### Best practice recommendations:

- **High-load scenarios such as databases, video transcoding, and AI inference**: avoid overcommit or keep it low (e.g. 1:1 ~ 2:1).
- **Light-load scenarios such as web, office, and test environments**: high overcommit is acceptable (e.g. 4:1 ~ 8:1 or even higher).
- Some cloud providers (such as AWS and Alibaba Cloud) set different overcommit ratios for different instance types, but do not disclose the detailed ratios.

------

### Summary in one sentence:

> The **overcommit ratio** is a metric that measures the allocation ratio between vCPUs and pCPUs. It is a common strategy for improving resource utilization in virtualized environments, but it requires a trade-off between performance and cost-effectiveness.

### 7. Allocation and scheduling of VM vCPUs

A virtual machine does not directly perceive the physical CPU; its computing units are presented through vCPU objects. The virtual machine only sees the vCPUs that the VMM presents to it. In the VMM, each vCPU corresponds to a VMCS (Virtual-Machine Control Structure). When a vCPU is switched off a physical CPU, its running context is saved in its corresponding VMCS structure; when the vCPU is switched onto a PCPU to run, its running context is imported from the corresponding VMCS structure onto the physical CPU. In this way, each vCPU runs independently.

From the structure and functional division of the virtual machine system, the guest operating system and the virtual machine monitor together form a two-level scheduling framework for the virtual machine system. The figure shows a two-level scheduling framework in a multi-core environment. The guest operating system is responsible for level-2 scheduling, i.e. scheduling threads or processes on vCPUs (mapping core threads to the corresponding vCPUs). The virtual machine monitor is responsible for level-1 scheduling, i.e. scheduling vCPUs on physical processing units. The scheduling policies and mechanisms of the two levels are independent of each other. The vCPU scheduler is responsible for allocating and scheduling physical processor resources among virtual machines; in essence, it schedules the vCPUs of each virtual machine onto physical processing units according to certain policies and mechanisms. Any policy can be used to allocate physical resources to meet the different needs of virtual machines. A vCPU can be scheduled on one or more physical processing units (time-sharing or space-sharing physical processing units), or it can establish a fixed one-to-one mapping with a physical processing unit (restricting access to a specified physical processing unit).

![img](https://markdownimage-1257263724.cos.ap-chengdu.myqcloud.com/typroa/download-20250924220315293.jpeg)
