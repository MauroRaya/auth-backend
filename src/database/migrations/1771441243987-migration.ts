import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1771441243987 implements MigrationInterface {
  name = 'Migration1771441243987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "isActive" DROP DEFAULT`,
    );
  }
}
