-- DropIndex
DROP INDEX "Booking_venueId_idx";

-- CreateIndex
CREATE INDEX "Booking_venueId_startTime_endTime_idx" ON "Booking"("venueId", "startTime", "endTime");
