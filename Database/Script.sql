IF (SELECT OBJECT_ID('[dbo].[Periods]')) IS NULL
BEGIN
CREATE TABLE [dbo].[Periods](
	[PeriodsID] [varchar](50) NOT NULL,
	[PeriodsName] [varchar](100) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[ReplicationCounterFromOrigin] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PeriodsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END

IF (SELECT OBJECT_ID('[dbo].[Subjects]')) IS NULL
BEGIN
CREATE TABLE [dbo].[Subjects](
	[SubjectID] [varchar](50) NOT NULL,
	[SubjectName] [varchar](100) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[ReplicationCounterFromOrigin] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SubjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

END


