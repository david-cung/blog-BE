import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1732543677494 implements MigrationInterface {
    name = 'CreatePostTable1732543677494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` varchar(36) NOT NULL, \`userId\` int NOT NULL, \`content\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL DEFAULT 'Uncategorized', \`slug\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`posts\``);
    }

}
