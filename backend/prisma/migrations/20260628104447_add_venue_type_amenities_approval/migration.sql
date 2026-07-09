/*
  Warnings:

  - Added the required column `venueType` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VenueType" AS ENUM ('AUDITORIUM', 'CONFERENCE_HALL', 'PARTY_HALL', 'OUTDOOR_VENUE', 'BANQUET_HALL', 'MEETING_ROOM', 'SPORTS_ARENA', 'OTHER');

-- CreateEnum
CREATE TYPE "VenueApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "approvalStatus" "VenueApprovalStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "venueType" "VenueType" NOT NULL;

-- CreateIndex
CREATE INDEX "Venue_approvalStatus_idx" ON "Venue"("approvalStatus");

-- CreateIndex
CREATE INDEX "Venue_venueType_idx" ON "Venue"("venueType");
