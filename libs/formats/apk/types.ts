export interface ApkIndexRecord {
  architecture
  pullChecksum
}

export const ApkIndexRecordFields = [
  {
    field: 'A',
    name: 'Architecture',
  },
  {
    field: 'C',
    name: 'PullChecksum',
  },
  {
    field: 'D',
    name: 'PullDependencies',
  },
];

/*
A	Architecture	?	^A:\S+$	?	yes
C	Pull Checksum	?	?	?	yes
D	Pull Dependencies	?	?	?	yes
F	File Path	?	?	?	no
I	Package Installed Size	?	?	?	yes
L	License	?	?	?	yes
M	File Permissions	?	?	?	no
P	Package Name (no version, just the plain name)	?	?	?	yes
R	Get File	?	?	?	no
S	Package Size	?	^S:(\d+)$	?	yes
T	Package Description	?	?	?	yes
U	Package URL	?	?	?	yes
V	Package Version	?	?	?	yes
Z	Pull Checksum	?	?	?	no
a	Check for file existence	?	?	?	no
c	Git commit of aport	?	?	?	yes
k	Provider priority	?	?	?	yes
i	Automatic Install Condition (aka Install IF)	?	?	?	yes
m	Maintainer	?	?	?	yes
o	Package Origin	?	?	?	yes
q	Replaces Priority	?	?	?	no
p	Package Provides	?	?	?	yes
r	Pull Dependencies	?	?	?	no
s	Get Tag Id	?	?	?	no
t	Build Timestamp (epoch)	?	^t:(\d+)$	?	yes
 */
