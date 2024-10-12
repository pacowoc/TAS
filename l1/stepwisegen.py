v = []
c=0
for c1 in range(1,100):
    c+=100*pow(3,c1-1) 
    v.append(c)
print(v)