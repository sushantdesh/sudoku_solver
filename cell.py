
from grid import *
import os


class cells:
    def __init__(self, row, col, op_queue):
        self.row = row
        self.col = col
        self.op_queue = op_queue
        self.child = []
        self.parent = None


cell1 = cells(1, 1, (2, 3))
cell1.child.append(cells(1, 2, (3, 4)))
cell1.child.append(cells(1, 4, (11, 23)))

vacant_list=[]
def check_vacant_list():
    for x in range(0,9):
        for y in range(0,9):
            if g.dic[x][y]=='x':
                return [x,y]
    return False
def order():

    if not check_vacant_list():
        print("true")
        return True
    else:
        [row,col]=check_vacant_list()


    # print(row,col)
    for num in range(1, 10):
        if g.update(row, col, num):

            if order():
                return True
            g.update(row,col,'x')
    print("backtrack")
    return False


order()
for e in range(0, 9):
    print(g.dic[e])
