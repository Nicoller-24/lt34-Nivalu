"""empty message

Revision ID: 219130cbf4ea
Revises: 4abbaebfdf6d
Create Date: 2024-10-28 12:34:56.789012
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '219130cbf4ea'
down_revision = '4abbaebfdf6d'
branch_labels = None
depends_on = None


def upgrade():
    # Adding category_id column as nullable first
    with op.batch_alter_table('restaurant', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))

    # Here you might want to add your logic to set default values for existing records
    # You can run an update statement after this to populate the column
    # For example:
    # op.execute("UPDATE restaurant SET category_id = 1 WHERE category_id IS NULL")

    # Make the column NOT NULL
    with op.batch_alter_table('restaurant', schema=None) as batch_op:
        batch_op.alter_column('category_id',
                               existing_type=sa.Integer(),
                               nullable=False)


def downgrade():
    with op.batch_alter_table('restaurant', schema=None) as batch_op:
        batch_op.drop_column('category_id')