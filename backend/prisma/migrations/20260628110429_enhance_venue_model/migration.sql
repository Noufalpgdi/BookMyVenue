/*
  Warnings:

  - Added the required column `district` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "latitude" DECIMAL(10,8),
ADD COLUMN     "longitude" DECIMAL(11,8),
ADD COLUMN     "state" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Venue_ownerId_idx" ON "Venue"("ownerId");

-- CreateIndex
CREATE INDEX "Venue_city_idx" ON "Venue"("city");

-- CreateIndex
CREATE INDEX "Venue_district_idx" ON "Venue"("district");

-- CreateIndex
CREATE INDEX "Venue_state_idx" ON "Venue"("state");

-- CreateIndex
CREATE INDEX "Venue_approvalStatus_city_idx" ON "Venue"("approvalStatus", "city");

-- CreateIndex
CREATE INDEX "Venue_approvalStatus_venueType_idx" ON "Venue"("approvalStatus", "venueType");

-- CreateIndex
CREATE INDEX "Venue_approvalStatus_city_venueType_idx" ON "Venue"("approvalStatus", "city", "venueType");
