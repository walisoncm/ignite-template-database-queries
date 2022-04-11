import { MigrationInterface, QueryRunner } from "typeorm";

export class genres1649697430904 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "games_genres" ("gamesId" uuid NOT NULL, "genresId" uuid NOT NULL, CONSTRAINT "PK_cd4067d574477fd5c7693bc7872" PRIMARY KEY ("gamesId", "genresId"))'
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_e5263d029d8644de829aae5c35" ON "games_genres" ("gamesId")'
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_934b0d8f9d0084c97d3876ad32" ON "games_genres" ("genresId")'
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres" ADD CONSTRAINT "FK_e5263d029d8644de829aae5c35a" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres" ADD CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "games_genres" DROP CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d"'
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres" DROP CONSTRAINT "FK_e5263d029d8644de829aae5c35a"'
    );
    await queryRunner.query('DROP INDEX "IDX_934b0d8f9d0084c97d3876ad32"');
    await queryRunner.query('DROP INDEX "IDX_e5263d029d8644de829aae5c35"');
    await queryRunner.dropTable("genres");
    await queryRunner.dropTable("games_genres");
  }

}
