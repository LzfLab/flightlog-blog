---
title: 'Method for Calculating Available Capacity'
date: '2025-09-09'
summary: 'The total amount of user data a storage device can hold.'
tags: ['hardware']
draft: false
authors: ['default']
---

# Hard Drive Available Capacity Calculation Method

When purchasing or using hard drives (HDD, SSD, portable hard drives, USB flash drives, etc.), many users find that **the actual usable capacity is often smaller than the capacity advertised by the manufacturer**. This is not because the drive manufacturer is cutting corners, but because of differences in calculation methods and file systems. This article explains how to calculate the available capacity of a hard drive and why the "capacity shrinkage" phenomenon occurs.

The difference between utf8mb4 and utf8

###### ChatGPT says:

Good question. This is actually a "pitfall" in MySQL.

---

## 1. **The difference between utf8 and utf8mb4 in MySQL**

### MySQL's `utf8`

- **It is not standard UTF-8!**
- It can only store UTF-8 characters of **1–3 bytes** (supporting at most Unicode U+FFFF, the BMP plane).
- It cannot store **4-byte characters** (such as emoji, some special Chinese characters, minority scripts, and ancient scripts).
- Examples:
  - `"张"` Can be stored
  - `"😀"` Cannot be stored, and an error will be raised: `Incorrect string value`

---

### MySQL's `utf8mb4`

- It is a **truly complete UTF-8 implementation** (supporting 1–4 bytes).
- It can store all Unicode characters, including emoji.
- It has been supported since MySQL 5.5.3.
- It is recommended to **use utf8mb4 consistently** in new projects to avoid being unable to store emoji or other characters later.

---

## 2. **Storage comparison**

| Character set | Max bytes per character | Emoji support | Notes                                          |
| ------------- | ----------------------- | ------------- | ---------------------------------------------- |
| utf8          | 3 bytes                 | No            | MySQL's "trimmed-down" version of UTF-8        |
| utf8mb4       | 4 bytes                 | Yes           | The real UTF-8                                 |

---

## 3. **Performance differences**

- utf8mb4 has 1 extra byte of storage overhead compared with utf8, but the difference is very small.
- In the vast majority of scenarios (especially web and mobile), utf8mb4 is recommended.

---

## 4. **Best practices**

1. Use utf8mb4 for **databases, tables, and columns**

   ```
   CREATE DATABASE mydb DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
   ```

2. **Connection encoding** must also be set to utf8mb4 (otherwise inserting emoji will still raise an error):

   ```
   SET NAMES utf8mb4;
   ```

3. If a legacy database uses utf8, you can use:

   ```
   ALTER TABLE mytable CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
   ```

---

Summary:

- `utf8` = an incomplete UTF-8 that only supports 3 bytes
- `utf8mb4` = the real UTF-8 that supports 4 bytes, recommended at all times
