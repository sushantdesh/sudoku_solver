
class grid:
    def __init__(self):
        self.dic = {}
        for r in range(0, 9):
            temp = {}
            for i in range(0, 9):
                temp[i] = 'x'
                self.dic[r] = temp

    def update(self, row, col, val):
        if val=='x':
            self.dic[row][col]='x'
            return True
        if self.check_col(row,col,val):
            if self.check_row(row,col,val):
                if self.check_small_grid(row,col,val):
                    self.dic[row][col]=val
                    return True
        return False


    def check_row(self,row,col,val):
        for c in range(9):
            if self.dic[row][c]==val:

                return False
        return True

    def check_col(self, row, col, val):
        for r in range(9):
            if self.dic[r][col] == val:

                return False
        return True




    def check_small_grid(self, row, col, val):
        if row < 3:
            r_checkpoint = 0
        elif row>=3 and row < 6:
            r_checkpoint = 3
        else:
            r_checkpoint = 6
        if col < 3:
            c_checkpoint = 0
        elif col>=3 and col < 6:
            c_checkpoint = 3
        else:
            c_checkpoint = 6

        for r in range(r_checkpoint, r_checkpoint + 3):
            for i in range(c_checkpoint, c_checkpoint + 3):
                if self.dic[r][i] == val:
                    return False
        return True


arr1=[[8,3,'x','x',7,'x','x','x',6],
      ['x','x',9,3,'x',1,5,'x',2],
      [2,'x',6,'x','x','x',9,3,'x'],
      [6,'x',2,'x',8,'x','x',1,5],
      ['x','x','x','x',5,'x',6,2,9],
      [1,'x',3,'x','x',9,8,'x','x'],
      ['x',7,'x','x','x','x',2,5,1],
      ['x',2,'x',5,3,'x','x',6,'x'],
      ['x',6,'x',2,1,'x','x',9,'x']]


g = grid()

rows, cols = (9, 9)
arr = [['x' for i in range(cols)] for j in range(rows)]

for x in range(9):
    for y in range(9):

        arr[x][y]=arr1[x][y]
        if arr[x][y]!='x':
            arr[x][y]=int(arr[x][y])
    print(g.dic[x])


# vacant_list=[]

for a in range(0,9):
    for b in range(0,9):
        if arr[a][b]!='x':
            g.update(a,b,arr[a][b])
        # else:
        #     vacant_list.append([a,b])

