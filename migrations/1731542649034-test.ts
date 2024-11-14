import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1731542649034 implements MigrationInterface {
    name = 'Test1731542649034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_97672ac88f789774dd47f7c8be3\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`content\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`photoURL\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`photoURL\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT 'now()' ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`photoURL\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`photoURL\` varchar(10000) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_97672ac88f789774dd47f7c8be3\` ON \`users\` (\`email\`)`);
    }

}
