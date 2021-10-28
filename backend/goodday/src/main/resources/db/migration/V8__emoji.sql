ALTER DATABASE seeyouthere CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

ALTER TABLE notice CHANGE title title VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE notice CHANGE content content TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE board CHANGE title title VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE board CHANGE content content TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE member CHANGE nickname nickname VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE address CHANGE nickname nickname VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
