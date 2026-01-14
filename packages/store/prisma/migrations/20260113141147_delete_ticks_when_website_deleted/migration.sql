-- DropForeignKey
ALTER TABLE "ticks" DROP CONSTRAINT "ticks_website_id_fkey";

-- AddForeignKey
ALTER TABLE "ticks" ADD CONSTRAINT "ticks_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
